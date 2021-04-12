<template>
  <div class="chat">
    <div class="chat--messages-container">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="chat--message"
      >
        {{ message.name }} {{ message.content }}
      </div>
    </div>
    <b-form-input
      @keydown.enter="sendMessage()"
      v-model="inputText"
      placeholder="Type here..."
      class="chat--input"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface Message {
  name: string
  content: string
}

@Component
export default class Chat extends Vue {
  @Prop({ type: String, required: true }) private readonly user!: string

  private inputText: string = ''
  private messages: Message[] = []

  private sendMessage(): void {
    this.messages.push({ name: this.user, content: this.inputText })
    this.inputText = ''
    this.$nextTick(() => {
      this.scrollToBottom()
    })
  }

  private scrollToBottom(): void {
    const container: Element | null = this.$el.querySelector('.chat--messages-container')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }
}
</script>

<style lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  width: 100%;

  &--messages-container {
    overflow-y: scroll;
    height: 100%;
    width: 100%;
  }

  &--message {
    text-align: left;
    padding: 0 4px 4px 8px;
  }
}
</style>
