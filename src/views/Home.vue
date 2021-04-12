<template>
  <div class="home">
    <chat user="JT" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Chat from '@/components/Chat.vue'

@Component({
  components: {
    Chat
  }
})
export default class Home extends Vue {}
</script>
