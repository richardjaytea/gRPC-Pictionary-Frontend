<template>
  <img :src="imageSrc">
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ImageService } from '../service/ImageService'
import { ImageResponse } from '../pb/services_pb'

@Component
export default class CImage extends Vue {
  @Prop({ type: String, required: true }) private readonly roomKey!: string

  private imageService!: ImageService
  private imageSrc: string = ''

  public created(): void {
    this.imageService = new ImageService()
    this.imageService.connectImageStream(this.roomKey, response => {
      const resp: ImageResponse = response as ImageResponse
      this.imageSrc = resp.getContent()
    })
  }
}
</script>

<style lang="scss">
img {
  max-width:100%;
  max-height: 100%;
}
</style>
