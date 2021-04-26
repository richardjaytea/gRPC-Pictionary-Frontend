<template>
  <div class="image">
    <img :src="imageSrc">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ImageService } from '../service/ImageService'
import { ImageResponse } from '../pb/services_pb'

@Component
export default class CImage extends Vue {
  private imageService!: ImageService
  private imageSrc: string = ''

  public cancelStream(): void {
    this.imageService.cancelImageStream()
  }

  public created(): void {
    this.imageService = new ImageService()
    this.imageService.connectImageStream(response => {
      const resp: ImageResponse = response as ImageResponse
      this.imageSrc = resp.getContent()
    })
  }
}
</script>

<style lang="scss">
.image {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  img {
    max-height: 100%;
    max-width: 100%;
  }
}
</style>
