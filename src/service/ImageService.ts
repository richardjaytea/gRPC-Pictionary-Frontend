import * as grpcWeb from 'grpc-web'
import { ClientReadableStream } from 'grpc-web'
import { ImageClient } from '@/pb/ServicesServiceClientPb'
import { Client, ImageWordResponse } from '@/pb/services_pb'
import store from '@/store'

export class ImageService {
  private readonly imageService = new ImageClient('http://localhost:8082', null, null)
  private imageStream!: ClientReadableStream<unknown>
  private wordStream!: ClientReadableStream<unknown>

  constructor() {
    const request = new Client()
    request.setRoomkey(store.getters.getRoom)
    request.setId(store.getters.getId)

    this.connectImageStream(request, this.storeImageWordCallback)
  }

  private connectImageStream(request: Client, callback: (response: unknown) => void): void {
    this.imageStream = this.imageService.getImageAndWords(request)

    this.imageStream.on('data', callback)

    this.imageStream.on('error', err => {
      console.log(`Unexpected stream error: code = ${err.code}` +
        `, message = "${err.message}"`)
    })

    this.imageStream.on('end', () => {
      console.log('stream end signal received')
    })
  }

  private storeImageWordCallback = (response: unknown) => {
    const resp: ImageWordResponse = response as ImageWordResponse
    store.commit('SET_IMAGE', resp.getContent())
    store.commit('SET_WORDS', resp.getWordsList())
    store.commit('CLEAR_MATCHED_WORDS')
  }

  public cancelAllStreams(): void {
    this.imageStream.cancel()
    this.wordStream.cancel()
  }
}
