<template>
  <div class="sc-message-list" ref="scrollList" :style="{backgroundColor: colors.messageList.bg}">
    <Message v-for="(message, idx) in messages" :message="message" :chatImageUrl="chatImageUrlFor(message.author)" :authorName="authorName(message.author)" :key="idx" :colors="colors" />
    <Message v-show="showTypingIndicator" :message="{author: 'them', type: 'typing'}" :chatImageUrl="chatImageUrl" :colors="colors" />
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
    agentProfiles: {
      type: Array,
      default: () => []
    },
    teamName: {
      type: String,
      default: ''
    },
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
    },
    colors: {
      type: Object,
      required: true
    },
    alwaysScrollToBottom: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    _scrollDown () {
      this.$refs.scrollList.scrollTop = this.$refs.scrollList.scrollHeight
    },
    shouldScrollToBottom() {
      return this.alwaysScrollToBottom || (this.$refs.scrollList.scrollTop > this.$refs.scrollList.scrollHeight - 600)
    },
    chatImageUrlFor(author) {
      if (this.agentProfiles && this.agentProfiles.some(profile => profile.id === author)) {
        return this.agentProfiles.find(profile => profile.id === author).imageUrl
      }
      return this.chatImageUrl
    },
    authorName(author) {
      if (this.agentProfiles && this.agentProfiles.some(profile => profile.id === author)) {
        return this.agentProfiles.find(profile => profile.id === author).teamName
      }
      return this.teamName
    }
  },
  mounted () {
    this._scrollDown()
  },
  updated () {
    if (this.shouldScrollToBottom())
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
