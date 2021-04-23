import * as grpcWeb from 'grpc-web'
import { ClientReadableStream } from 'grpc-web'
import { ImageClient } from '@/pb/ServicesServiceClientPb'
import { Client } from '@/pb/services_pb'
import store from '@/store'

export class ImageService {
  private readonly imageService = new ImageClient('http://localhost:8082', null, null)
  private imageStream!: ClientReadableStream<unknown>

  public connectImageStream(callback: (response: unknown) => void): void {
    const request = new Client()
    request.setRoomkey(store.getters.getRoom)
    request.setId(store.getters.getId)

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

  public cancelImageStream(): void {
    this.imageStream.cancel()
  }
}
