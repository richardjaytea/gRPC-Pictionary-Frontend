import * as grpcWeb from 'grpc-web'
import { ClientReadableStream } from 'grpc-web'
import { ImageClient } from '@/pb/ServicesServiceClientPb'
import { Client, ImageResponse, WordResponse } from '@/pb/services_pb'
import store from '@/store'

export class ImageService {
  private readonly imageService = new ImageClient('http://localhost:8082', null, null)
  private imageStream!: ClientReadableStream<unknown>
  private wordStream!: ClientReadableStream<unknown>

  constructor() {
    const request = new Client()
    request.setRoomkey(store.getters.getRoom)
    request.setId(store.getters.getId)

    this.connectImageStream(request, this.storeImageCallback)
    this.connectWordStream(request, this.storeWordsCallback)
  }

  private connectImageStream(request: Client, callback: (response: unknown) => void): void {
    this.imageStream = this.imageService.getImage(request)

    this.imageStream.on('data', callback)

    this.imageStream.on('error', err => {
      console.log(`Unexpected stream error: code = ${err.code}` +
        `, message = "${err.message}"`)
    })

    this.imageStream.on('end', () => {
      console.log('stream end signal received')
    })
  }

  private storeImageCallback = (response: unknown) => {
    const resp: ImageResponse = response as ImageResponse
    store.commit('SET_IMAGE', resp.getContent())
  }

  private connectWordStream(request: Client, callback: (response: unknown) => void): void {
    this.wordStream = this.imageService.getWords(request)

    this.wordStream.on('data', callback)

    this.wordStream.on('error', err => {
      console.log(`Unexpected stream error: code = ${err.code}` +
        `, message = "${err.message}"`)
    })

    this.wordStream.on('end', () => {
      console.log('stream end signal received')
    })
  }

  private storeWordsCallback = (response: unknown) => {
    const resp: WordResponse = response as WordResponse
    store.commit('SET_WORDS', resp.getWordsList())
    store.commit('CLEAR_MATCHED_WORDS')
    console.log(store.getters.getWords)
  }

  public cancelAllStreams(): void {
    this.imageStream.cancel()
    this.wordStream.cancel()
  }
}
