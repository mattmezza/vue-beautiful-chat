<template>
  <div class="sc-message">
    <div class="sc-message--content" :class="{
        sent: message.author === 'me',
        received: message.author !== 'me' && message.type !== 'system',
        system: message.type === 'system'
      }">
      <div v-if="message.type !== 'system'" :title="authorName" class="sc-message--avatar" :style="{
        backgroundImage: `url(${chatImageUrl})`
      }"></div>
      <TextMessage v-if="message.type === 'text'" :data="message.data" :messageColors="determineMessageColors()" />
      <EmojiMessage v-else-if="message.type === 'emoji'" :data="message.data" />
      <FileMessage v-else-if="message.type === 'file'" :data="message.data" :messageColors="determineMessageColors()" />
      <TypingMessage v-else-if="message.type === 'typing'" :messageColors="determineMessageColors()" />
      <SystemMessage v-else-if="message.type === 'system'" :data="message.data" :messageColors="determineMessageColors()" />
    </div>
  </div>
</template>

<script>
import TextMessage from './TextMessage.vue'
import FileMessage from './FileMessage.vue'
import EmojiMessage from './EmojiMessage.vue'
import TypingMessage from './TypingMessage.vue'
import SystemMessage from './SystemMessage.vue'
import chatIcon from './assets/chat-icon.svg'

export default {
  data () {
    return {

    }
  },
  components: {
    TextMessage,
    FileMessage,
    EmojiMessage,
    TypingMessage,
    SystemMessage
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    chatImageUrl: {
      type: String,
      default: chatIcon
    },
    colors: {
      type: Object,
      required: true
    },
    authorName: {
      type: String
    }
  },
  methods: {
    sentColorsStyle() {
      return {
        color: this.colors.sentMessage.text,
        backgroundColor: this.colors.sentMessage.bg
      }
    },
    receivedColorsStyle() {
      return {
        color: this.colors.receivedMessage.text,
        backgroundColor: this.colors.receivedMessage.bg
      }
    },
    determineMessageColors() {
      return this.message.author === 'me' ? this.sentColorsStyle() : this.receivedColorsStyle()
    }
  }
}
</script>
<style>
.sc-message {
  width: 300px;
  margin: auto;
  padding-bottom: 10px;
  display: flex;
}

.sc-message--content {
  width: 100%;
  display: flex;
}

.sc-message--content.sent {
  justify-content: flex-end;
}

.sc-message--content.system {
  justify-content: center;
}

.sc-message--content.sent .sc-message--avatar {
  display: none;
}

.sc-message--avatar {
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  align-self: center;
  margin-right: 15px;
}

.sc-message--meta {
  font-size: xx-small;
  margin-bottom: -10px;
  color: white;
  text-align: center;
}

@media (max-width: 450px) {
  .sc-message {
    width: 80%;
  }
}

.sc-message--text {
  padding: 17px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased
}
.sc-message--content.sent .sc-message--text {
  color: white;
  background-color: #4e8cff;
  max-width: calc(100% - 120px);
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--text {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}
</style>
