<template>
  <div class="sc-message-list">
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
  }
}
</script>
