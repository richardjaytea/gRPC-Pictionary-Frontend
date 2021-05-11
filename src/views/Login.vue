<template>
  <div class="login">
    <b-form-input
      v-model="name"
      size="lg"
      placeholder="Tell us your name!"
      class="login--input"
    />

    <b-form-select
      v-model="room"
      :options="roomsWithLabel"
      value-field="key"
      text-field="name"
      class="login--input"
    />

    <b-button
      @click="login"
      variant="outline-primary"
    >
      Enter
    </b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthService } from '@/service/AuthService'
import { RoomService } from '@/service/RoomService'
import { mapGetters } from 'vuex'
import { Room } from '@/types/room'

@Component({
  computed: {
    ...mapGetters({
      rooms: 'getRooms'
    })
  }
})
export default class Login extends Vue {
  private authService!: AuthService
  private roomService!: RoomService
  private rooms!: Room[]
  private name: string = ''
  private room: string = ''

  private get roomsWithLabel(): Room[] {
    const label: Room = { name: 'Select a room!', key: '' }
    return [label].concat(this.rooms)
  }

  private login(): void {
    if (this.name.trim() !== '' && this.room !== '') {
      this.authService.authenticate(this.name, this.room)
        .then(() => {
          this.$router.push({
            name: 'Room',
            params: {
              user: this.name,
              roomKey: this.room
            }
          })
        })
    }
  }

  public created(): void {
    this.authService = new AuthService()
    this.roomService = new RoomService()
  }
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;

  &--input {
    margin-bottom: 8px;
    max-width: 25%;
  }
}
</style>
