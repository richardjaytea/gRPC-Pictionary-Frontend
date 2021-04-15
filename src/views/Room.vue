<template>
  <div class="room">
    <b-row class="room--grid-row">
      <b-col
        cols="9"
        class="room--grid-cols"
      >
        <c-image :room-key="roomKey"/>
      </b-col>
      <b-col
        cols="3"
        class="room--grid-cols"
      >
        <chat
          :user="user"
          :room-key="roomKey"
          class="room--chat"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Chat from '@/components/Chat.vue'
import CImage from '@/components/CImage.vue'

@Component({
  components: {
    CImage,
    Chat
  }
})
export default class Room extends Vue {
  @Prop({ type: String, required: true }) private readonly user!: string
  @Prop({ type: String, required: true }) private readonly roomKey!: string
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
