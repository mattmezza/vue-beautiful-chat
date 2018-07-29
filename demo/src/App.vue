<template>
  <div>
    <Header />
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
      <p class="text-center"><a href="#" @click.prevent="openChat()">Open the chat window</a></p>
      <p class="text-center">
        <a href="#" @click.prevent="setColor('red')">Red</a>
        <a href="#" @click.prevent="setColor('green')">Green</a>
        <a href="#" @click.prevent="setColor('blue')">Blue</a>
      </p>
    <TestArea :onMessage="handleMessageFromTextArea" :onTyping="handleTyping" />
    <Footer />
  </div>
</template>

<script>
import messageHistory from './messageHistory'
import Header from './Header.vue'
import Footer from './Footer.vue'
import TestArea from './TestArea.vue'

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
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#f4f7f9',
          text: '#ffffff'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      },
      availableColors: {
        red: {
          header: {
            bg: '#ff0000',
            text: '#fff'
          },
          launcher: {
            bg: '#ff0000'
          },
          messageList: {
            bg: '#fff'
          },
          sentMessage: {
            bg: '#ff0000',
            text: '#fff'
          },
          receivedMessage: {
            bg: '#f4f7f9',
            text: '#fff'
          },
          userInput: {
            bg: '#f4f7f9',
            text: '#565867'
          }
        },
        green: {
          header: {
            bg: '#00ff00',
            text: '#fff'
          },
          launcher: {
            bg: '#00ff00'
          },
          messageList: {
            bg: '#fff'
          },
          sentMessage: {
            bg: '#00ff00',
            text: '#fff'
          },
          receivedMessage: {
            bg: '#f4f7f9',
            text: '#ffffff'
          },
          userInput: {
            bg: '#f4f7f9',
            text: '#565867'
          }
        },
        blue: {
          header: {
            bg: '#4e8cff',
            text: '#ffffff'
          },
          launcher: {
            bg: '#4e8cff'
          },
          messageList: {
            bg: '#ffffff'
          },
          sentMessage: {
            bg: '#4e8cff',
            text: '#ffffff'
          },
          receivedMessage: {
            bg: '#f4f7f9',
            text: '#ffffff'
          },
          userInput: {
            bg: '#f4f7f9',
            text: '#565867'
          }
        }
      }
    }
  },
  mounted() {
    this.setColor('blue')
  },
  methods: {
    handleMessageFromTextArea (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.messageList.push({author: 'them', type: 'text', data: { text }})
      }
    },
    handleTyping (text) {
      this.showTypingIndicator = text.length > 0;
    },
    onMessageWasSent (msg) {
      this.messageList.push(msg)
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
</style>