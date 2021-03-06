<template>
  <div class="chat">
    <div class="chat--messages-container">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="chat--message"
      >
        <div
          v-if="isSystem(message.name)"
          class="chat--message-system"
        >
          {{ message.content }}
        </div>

        <template v-else>
          <span class="chat--message-username">
            {{ message.name }}
          </span>
          {{ message.content }}
        </template>
      </div>
    </div>
    <div class="chat--input-container">
      <b-form-input
        @keyup.enter="sendMessage()"
        v-model="inputText"
        placeholder="Type here..."
        class="chat--input"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ChatService } from '@/service/ChatService'
import { mapGetters } from 'vuex'

interface Message {
  name: string
  content: string
}

@Component({
  computed: {
    ...mapGetters({
      chatService: 'getChatService',
      messages: 'getMessages'
    })
  }
})
export default class Chat extends Vue {
  // Data
  private inputText: string = ''

  // Mapped Getters
  private chatService!: ChatService
  private messages!: Message[]

  private sendMessage(): void {
    if (this.inputText.trim() !== '') {
      this.chatService.sendMessage(this.inputText)
      this.inputText = ''
    }
  }

  private scrollToBottom(): void {
    const container: Element | null = this.$el.querySelector('.chat--messages-container')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }

  private isSystem(name: string): boolean {
    return name === process.env.VUE_APP_SYS_CHAT_NAME
  }

  @Watch('messages')
  private onMessagesUpdate(): void {
    this.$nextTick(() => {
      this.scrollToBottom()
    })
  }
}
</script>

<style lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  &--messages-container {
    word-wrap: break-word;
    overflow-y: scroll;
    position: absolute;
    height: 94%;
    width: 100%;
  }

  &--message {
    text-align: left;
    padding: 0 4px 4px 8px;
  }

  &--message-system {
    color: limegreen;
  }

  &--message-username {
    font-weight: bold;
    color: dodgerblue;
  }

  &--input-container {
    position: absolute;
    bottom: 0;
    padding: 8px;
    width: 100%;
  }
}
</style>
