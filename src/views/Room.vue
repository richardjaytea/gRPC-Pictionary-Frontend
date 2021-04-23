<template>
  <div class="room">
    <b-row class="room--grid-row">
      <b-col
        cols="9"
        class="room--grid-cols"
      >
        <c-image ref="image" />
      </b-col>
      <b-col
        cols="3"
        class="room--grid-cols"
      >
        <chat ref="chat" class="room--chat" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Chat from '@/components/Chat.vue'
import CImage from '@/components/CImage.vue'
import { Route } from 'vue-router'

Component.registerHooks(['beforeRouteLeave'])

@Component({
  components: {
    CImage,
    Chat
  }
})
export default class Room extends Vue {
  $refs!: {
    image: CImage,
    chat: Chat
  }

  // eslint-disable-next-line
  public beforeRouteLeave(to: Route, from: Route, next: any): void {
    if (confirm('You will be taken back to the Login page. Do you want to continue?')) {
      this.$refs.image.cancelStream()
      this.$refs.chat.cancelStream()
      next()
    }

    next(false)
  }
}
</script>

<style lang="scss">
.room {
  height: 100%;

  &--grid-row {
    height: 100%;
    max-width: 100%;
    margin: 0 !important;
  }

  &--grid-cols {
    padding: 0 !important;
    max-width: 100%;
    max-height: 100%;
  }

  &--chat {
    border-left: 1px solid #ced4da;
  }
}
</style>
