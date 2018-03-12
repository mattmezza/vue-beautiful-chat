<template>
  <div class="sc-message-list" ref="scrollList">
    <Message v-for="(message, idx) in messages" :message="message" :key="idx" />
  </div>
</template>
<script>
import Message from './Message.vue'

export default {
  components: {
    Message
  },
  props: {
    messages: {
      type: Array,
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
  background-color: white;
  background-size: 100%;
  padding: 40px 0px;
}
</style>
