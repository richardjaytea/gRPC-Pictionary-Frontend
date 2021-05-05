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
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

interface WordDisplay {
  [key: string]: string
}

@Component({
  computed: {
    ...mapGetters({
      words: 'getWords',
      matchedWords: 'getMatchedWords',
      imageSrc: 'getImage'
    })
  }
})
export default class CImage extends Vue {
  // Mapped Getters
  private imageSrc!: string
  private words!: string[]
  private matchedWords!: string[]

  private get formattedWords(): WordDisplay {
    let formattedWord = ''
    let foundSpace = false
    const formattedObj: WordDisplay = {}

    for (const word of this.words) {
      if (this.matchedWords.indexOf(word) >= 0) {
        formattedObj[word] = word
        continue
      }

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
