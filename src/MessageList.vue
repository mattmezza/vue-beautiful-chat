<template>
  <div class="sc-message-list" ref="scrollList" :style="{backgroundColor: colors.messageList.bg}">
    <Message v-for="(message, idx) in messages" :message="message" :chatImageUrl="chatImageUrl" :key="idx" :baseUrl="baseUrl" :colors="colors" />
    <Message v-show="showTypingIndicator" :message="{author: 'them', type: 'typing'}" :chatImageUrl="chatImageUrl" :colors="colors" :key="idx" />
  </div>
</template>
<script>
import Message from './Message.vue'

export default {
  components: {
    Message
  },
  props: {
    baseUrl: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      required: true
    },
    chatImageUrl: {
      type: String,
      default() {
        return this.baseUrl + 'chat-icon.svg'
      }
    },
    showTypingIndicator: {
      type: Boolean,
      default: () => false
    },
    colors: {
      type: Object,
      required: true
    }
  },
  methods: {
    _scrollDown () {
      this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight
    }
  },
  mounted () {
    this._scrollDown()
  },
  updated () {
    this.$nextTick(this._scrollDown())
  }
}
</script>

<style scoped>
.sc-message-list {
  height: 80%;
  overflow-y: auto;
  background-size: 100%;
  padding: 40px 0px;
}
</style>
