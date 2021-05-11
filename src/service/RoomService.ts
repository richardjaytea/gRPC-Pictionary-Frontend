import store from '@/store'
import { RoomClient } from '@/pb/ServicesServiceClientPb'
import { RoomDetail, RoomResponse } from '@/pb/services_pb'
import { Empty } from 'google-protobuf/google/protobuf/empty_pb'
import { Room } from '@/types/room'

export class RoomService {
  private readonly roomService = new RoomClient('http://localhost:8084', null, null)

  constructor() {
    this.getRooms()
  }

  private getRooms(): void {
    this.roomService.getRooms(new Empty(), null)
      .then((response) => {
        const resp: RoomResponse = response as RoomResponse
        const rooms: Room[] = []

        resp.getRoomsList().forEach((room: RoomDetail) => {
          rooms.push({
            name: room.getName(),
            key: room.getKey()
          })
        })

        store.commit('SET_ROOMS', rooms)
      })
  }
}
