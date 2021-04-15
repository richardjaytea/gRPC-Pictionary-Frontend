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

@Component
export default class Login extends Vue {
  private name: string = ''
  private room: string = ''

  private login(): void {
    this.$store.dispatch('setUser', this.name)
    this.$store.dispatch('setRoom', this.room)
    this.$router.push({
      name: 'Room',
      params: {
        user: this.name,
        roomKey: this.room
      }
    })
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
