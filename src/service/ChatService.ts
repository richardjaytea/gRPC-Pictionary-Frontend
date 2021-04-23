import * as grpcWeb from 'grpc-web'
import { ChatClient } from '@/pb/ServicesServiceClientPb'
import { MessageRequest, MessageStreamRequest } from '@/pb/services_pb'
import { ClientReadableStream } from 'grpc-web'
import store from '@/store'

export class ChatService {
  private readonly chatService = new ChatClient('http://localhost:8081', null, null)
  private messageStream!: ClientReadableStream<unknown>

  public connectMessageStream(callback: (response: unknown) => void): void {
    const request = new MessageStreamRequest()
    request.setId(store.getters.getId)
    request.setRoomkey(store.getters.getRoom)
    request.setName(store.getters.getUser)

    this.messageStream = this.chatService.getMessages(request)

    this.messageStream.on('data', callback)

    this.messageStream.on('error', err => {
      console.log(`Unexpected stream error: code = ${err.code}` +
        `, message = "${err.message}"`)
    })

    this.messageStream.on('end', () => {
      console.log('stream end signal received')
    })
  }

  public sendMessage(content: string): void {
    this.chatService.sendMessage(this.buildMessage(content), null, this.errorFunc())
  }

  private buildMessage(content: string): MessageRequest {
    const request = new MessageRequest()
    request.setId(store.getters.getId)
    request.setRoomkey(store.getters.getRoom)
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

  public cancelMessageStream(): void {
    this.messageStream.cancel()
  }
}
