import * as grpcWeb from 'grpc-web'
import { ChatClient } from '@/pb/ServicesServiceClientPb'
import { Client, MessageRequest, Room } from '@/pb/services_pb'
import { ClientReadableStream } from 'grpc-web'

export class ChatService {
  private readonly chatService = new ChatClient('http://localhost:8081', null, null)
  private roomKey!: string
  private clientId!: string
  private messageStream!: ClientReadableStream<unknown>

  public connectMessageStream(roomKey: string, callback: (response: unknown) => void): void {
    const request = new Room()
    request.setKey(roomKey)

    this.chatService.connectChat(request, null)
      .then((response: Client) => {
        this.roomKey = response.getRoomkey()
        this.clientId = response.getId()

        return this.chatService.getMessages(response)
      })
      .then((response: ClientReadableStream<unknown>) => {
        this.messageStream = response

        this.messageStream.on('data', callback)

        this.messageStream.on('error', err => {
          console.log(`Unexpected stream error: code = ${err.code}` +
            `, message = "${err.message}"`)
        })

        this.messageStream.on('end', () => {
          console.log('stream end signal received')
        })
      })
  }

  public sendMessage(content: string): void {
    this.chatService.sendMessage(this.buildMessage(content), null, this.errorFunc())
  }

  private buildMessage(content: string): MessageRequest {
    const request = new MessageRequest()
    request.setId(this.clientId)
    request.setRoomkey(this.roomKey)
    request.setContent(content)

    return request
  }

  private errorFunc() {
    return (err: grpcWeb.Error) => {
      if (err) {
        console.log(`Unexpected error: code = ${err.code}` +
          `, message = "${err.message}"`)
      }
    }
  }
}
