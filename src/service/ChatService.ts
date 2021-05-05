import * as grpcWeb from 'grpc-web'
import { ChatClient } from '@/pb/ServicesServiceClientPb'
import { MatchWordResponse, MessageRequest, MessageResponse, MessageStreamRequest } from '@/pb/services_pb'
import { ClientReadableStream } from 'grpc-web'
import store from '@/store'

export class ChatService {
  private readonly chatService = new ChatClient('http://localhost:8081', null, null)
  private messageStream!: ClientReadableStream<unknown>

  constructor() {
    const request = new MessageStreamRequest()
    request.setId(store.getters.getId)
    request.setRoomkey(store.getters.getRoom)
    request.setName(store.getters.getUser)

    this.connectMessageStream(request, this.storeMessageCallback)
  }

  private connectMessageStream(request: MessageStreamRequest, callback: (response: unknown) => void): void {
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

  private storeMessageCallback = (response: unknown) => {
    const resp: MessageResponse = response as MessageResponse
    store.commit('ADD_MESSAGE', { name: resp.getName(), content: resp.getContent() })
  }

  public sendMessage(content: string): void {
    this.chatService.sendMessage(
      this.buildMessage(content),
      null,
      (err, response) => {
        if (err) {
          console.log(err.message)
          return
        }
        const resp: MatchWordResponse = response as MatchWordResponse
        if (resp.getMatch()) {
          store.commit('ADD_MATCHED_WORD', content)
        }
      })
  }

  private buildMessage(content: string): MessageRequest {
    const request = new MessageRequest()
    request.setId(store.getters.getId)
    request.setRoomkey(store.getters.getRoom)
    request.setContent(content)

    return request
  }

  public cancelAllStreams(): void {
    this.messageStream.cancel()
  }
}
