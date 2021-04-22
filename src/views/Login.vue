<template>
  <div class="login">
    <b-form-input
      v-model="name"
      size="lg"
      placeholder="Tell us your name!"
      class="login--input"
    />

    <b-form-input
      v-model="room"
      size="lg"
      placeholder="Tell us what room!"
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

@Component
export default class Login extends Vue {
  private authService!: AuthService
  private name: string = ''
  private room: string = ''

  private login(): void {
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

  public created(): void {
    this.authService = new AuthService()
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
