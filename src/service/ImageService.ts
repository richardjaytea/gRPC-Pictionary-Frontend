import * as grpcWeb from 'grpc-web'
import { ClientReadableStream } from 'grpc-web'
import { ImageClient } from '@/pb/ServicesServiceClientPb'
import { Room } from '@/pb/services_pb'

export class ImageService {
  private readonly imageService = new ImageClient('http://localhost:8082', null, null)
  private roomKey!: string
  private imageStream!: ClientReadableStream<unknown>

  public connectImageStream(roomKey: string, callback: (response: unknown) => void): void {
    const request = new Room()
    request.setKey(roomKey)
    this.roomKey = roomKey

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
}
