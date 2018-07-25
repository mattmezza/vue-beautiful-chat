<template>
  <div class="sc-message-list" ref="scrollList">
    <Message v-for="(message, idx) in messages" :message="message" :chatImageUrl="chatImageUrl" :key="idx" />
    <Message v-if="showTypingIndicator" :message="{author: 'them', type: 'typing'}" :chatImageUrl="chatImageUrl" :key="idx" />
  </div>
</template>
<script>
import Message from './Message.vue'
import chatIcon from './assets/chat-icon.svg'

export default {
  components: {
    Message
  },
  props: {
    messages: {
      type: Array,
      required: true
    },
    chatImageUrl: {
      type: String,
      default: chatIcon
    },
    showTypingIndicator: {
      type: Boolean,
      default: () => false
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
  background-color: white;
  background-size: 100%;
  padding: 40px 0px;
}
</style>
