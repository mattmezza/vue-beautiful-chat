<template>
  <div class="sc-chat-window" :class="{opened: isOpen, closed: !isOpen}">
    <Header
      :teamName="agentProfile.teamName"
      :imageUrl="agentProfile.imageUrl"
      :onClose="onClose"
    />
    <MessageList
      :messages="messageList"
      :imageUrl="agentProfile.imageUrl"
    />
    <UserInput :showEmoji="showEmoji" :onSubmit="onUserInputSubmit" :showFile="showFile" />
  </div>
</template>

<script>
import Header from './Header.vue'
import MessageList from './MessageList.vue'
import UserInput from './UserInput.vue'

export default {
  components: {
    Header,
    MessageList,
    UserInput
  },
  props: {
    'showEmoji': {
      type: Boolean,
      default: false
    },
    'showFile': {
      type: Boolean,
      default: false
    },
    'agentProfile': {
      type: Object,
      required: true
    },
    'onUserInputSubmit': {
      type: Function,
      required: true
    },
    'onClose': {
      type: Function,
      required: true
    },
    'messageList': {
      type: Array,
      default: () => []
    },
    'isOpen': {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>
<style>
.sc-chat-window {
  width: 370px;
  height: calc(100% - 120px);
  max-height: 590px;
  position: fixed;
  right: 25px;
  bottom: 100px;
  box-sizing: border-box;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  border-radius: 10px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.sc-chat-window.closed {
  opacity: 0;
  visibility: hidden;
  bottom: 90px;
}

.sc-message-list {
  height: 80%;
  overflow-y: auto;
  background-color: white;
  background-size: 100%;
  padding: 40px 0px;
}

.sc-message--me {
  text-align: right;
}
.sc-message--them {
  text-align: left;
}

@media (max-width: 450px) {
  .sc-chat-window {
    width: 100%;
    height: 100%;
    max-height: 100%;
    right: 0px;
    bottom: 0px;
    border-radius: 0px;
  }
  .sc-chat-window {
    transition: 0.1s ease-in-out;
  }
  .sc-chat-window.closed {
    bottom: 0px;
  }
}
</style>
