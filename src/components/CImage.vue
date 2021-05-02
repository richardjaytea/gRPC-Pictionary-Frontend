<template>
  <div class="image">
    <div class="image--word-container">
      <ul class="image--word-list">
        <li
          v-for="word in words"
          v-bind:key="word"
        >
          {{ formattedWords[word] }}
        </li>
      </ul>
    </div>
    <img :src="imageSrc">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ImageService } from '../service/ImageService'
import { ImageResponse, WordResponse } from '../pb/services_pb'

interface WordDisplay {
  [key: string]: string
}

@Component
export default class CImage extends Vue {
  private imageService!: ImageService
  private imageSrc: string = ''
  private words: string[] = []

  private get formattedWords(): WordDisplay {
    let formattedWord = ''
    let foundSpace = false
    const formattedObj: WordDisplay = {}

    for (const word of this.words) {
      for (let i = 0; i < word.length; i++) {
        if (i === 0 || foundSpace) {
          formattedWord += word[i] + ' '
          foundSpace = false
        } else if (word[i].charCodeAt(0) === 32) {
          formattedWord += '  '
          foundSpace = true
        } else {
          formattedWord += '_ '
        }
      }

      formattedObj[word] = formattedWord
      formattedWord = ''
    }

    return formattedObj
  }

  public cancelStream(): void {
    this.imageService.cancelImageStream()
  }

  public created(): void {
    this.imageService = new ImageService()
    this.imageService.connectImageStream(response => {
      const resp: ImageResponse = response as ImageResponse
      this.imageSrc = resp.getContent()
    })
    this.imageService.connectWordStream(response => {
      const resp: WordResponse = response as WordResponse
      this.words = resp.getWordsList()
      console.log(this.words)
    })
  }
}
</script>

<style lang="scss">
.image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  &--word-container {
    display: grid;
    height: 8%;
  }

  &--word-list {
    list-style-type: none;
    column-count: 3;
    padding: 8px;
    margin: 0;
    white-space:pre;
  }

  img {
    height: 92%;
    max-height: 100%;
    max-width: 100%;
  }
}
</style>
