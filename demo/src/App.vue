<template>
  <div :style="{background: backgroundColor}">
    <Header :colors="colors" :chosenColor="chosenColor" />
    <beautiful-chat
      :agentProfile="agentProfile"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors" />
      <p class="text-center toggle">
        <a v-if="!isChatOpen" :style="{color: linkColor}" href="#" @click.prevent="openChat()">Open the chat window</a>
        <a v-else :style="{color: linkColor}" href="#" @click.prevent="closeChat()">Close the chat window</a>
      </p>
      <p class="text-center colors">
        <a :style="{background: availableColors.blue.launcher.bg}" href="#" @click.prevent="setColor('blue')">Blue</a>
        <a :style="{background: availableColors.red.launcher.bg}" href="#" @click.prevent="setColor('red')">Red</a>
        <a :style="{background: availableColors.green.launcher.bg}" href="#" @click.prevent="setColor('green')">Green</a>
        <a :style="{background: availableColors.dark.launcher.bg}" href="#" @click.prevent="setColor('dark')">Dark</a>
      </p>
    <TestArea :onMessage="sendMessage" :onTyping="handleTyping" :colors="colors" :chosenColor="chosenColor" />
    <Footer :colors="colors" :chosenColor="chosenColor" />
  </div>
</template>

<script>
import messageHistory from './messageHistory'
import Header from './Header.vue'
import Footer from './Footer.vue'
import TestArea from './TestArea.vue'
import availableColors from './colors'

export default {
  name: 'app',
  components: {
    Header, Footer, TestArea
  },
  data() {
    return {
      agentProfile: {
        teamName: 'Vue Beautiful Chat',
        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
      },
      messageList: messageHistory,
      newMessagesCount: 0,
      isChatOpen: false,
      showTypingIndicator: false,
      colors: null,
      availableColors,
      chosenColor: null
    }
  },
  created() {
    this.setColor('blue')
  },
  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'them', type: 'text', data: { text } })
      }
    },
    handleTyping (text) {
      this.showTypingIndicator = text.length > 0;
    },
    onMessageWasSent (message) {
      this.messageList = { ...this.messageList, message }
    },
    openChat () {
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      this.isChatOpen = false
    },
    setColor (color) {
      this.colors = this.availableColors[color]
      this.chosenColor = color
    }
  },
  computed: {
    linkColor() {
      return this.chosenColor === 'dark' ? this.colors.sentMessage.text : this.colors.launcher.bg
    },
    backgroundColor() {
      return this.chosenColor === 'dark' ? this.colors.messageList.bg : '#fff'
    }
  }
}
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}

* {
  font-family: Avenir Next, Helvetica Neue, Helvetica,sans-serif;
}

.demo-description {
  max-width: 500px;
}

.demo-description img {
  max-width: 500px;
}

.demo-test-area {
  width: 300px;
  box-sizing: border-box;
}

.demo-test-area--text {
  box-sizing: border-box;
  width: 100%;
  margin: 0px;
  padding: 0px;
  resize: none;
  font-family: Avenir Next, Helvetica Neue, Helvetica,sans-serif;
  background: #fafbfc;
  color: #8da2b5;
  border: 1px solid #dde5ed;
  font-size: 16px;
  padding: 16px 15px 14px;
  margin: 0;
  border-radius: 6px;
  outline: none;
  height: 150px;
  margin-bottom: 10px;
}

.demo-monster-img {
  width: 400px;
  display: block;
  margin: 60px auto;
}

.text-center {
  text-align: center;
}

.colors a {
  color: #fff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 10px;
}

.toggle a {
  text-decoration: none;
}
</style>
