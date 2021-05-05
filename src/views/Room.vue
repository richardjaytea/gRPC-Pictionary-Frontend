<template>
  <div class="room">
    <b-row class="room--grid-row">
      <b-col
        cols="9"
        class="room--grid-cols"
      >
        <c-image />
      </b-col>
      <b-col
        cols="3"
        class="room--grid-cols"
      >
        <chat class="room--chat" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Chat from '@/components/Chat.vue'
import CImage from '@/components/CImage.vue'
import { Route } from 'vue-router'
import { mapGetters } from 'vuex'
import { ChatService } from '@/service/ChatService'
import { ImageService } from '@/service/ImageService'

Component.registerHooks(['beforeRouteLeave'])

@Component({
  components: {
    CImage,
    Chat
  },
  computed: {
    ...mapGetters({
      chatService: 'getChatService',
      imageService: 'getImageService'
    })
  }
})
export default class Room extends Vue {
  // Mapped Getters
  private chatService!: ChatService
  private imageService!: ImageService

  // eslint-disable-next-line
  public beforeRouteLeave(to: Route, from: Route, next: any): void {
    if (confirm('You will be taken back to the Login page. Do you want to continue?')) {
      this.chatService.cancelAllStreams()
      this.imageService.cancelAllStreams()
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
