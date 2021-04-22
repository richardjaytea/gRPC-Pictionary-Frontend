import * as grpcWeb from 'grpc-web'
import { AuthClient } from '@/pb/ServicesServiceClientPb'
import { AuthRequest, Client } from '@/pb/services_pb'
import store from '@/store'

export class AuthService {
  private readonly authService = new AuthClient('http://localhost:8083', null, null)

  public authenticate(name: string, roomKey: string): Promise<void> {
    const request = new AuthRequest()
    request.setName(name)
    request.setRoomkey(roomKey)

    return this.authService.authenticate(request, null)
      .then((response: Client) => {
        store.commit('SET_ID', response.getId())
        store.commit('SET_USER', name)
        store.commit('SET_ROOM', response.getRoomkey())
      })
  }
}
