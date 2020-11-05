<template>
  <div :style="{background: backgroundColor}">
    <Header
      :chosenColor="chosenColor"
      :colors="colors"
    />
    <beautiful-chat 
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :close="closeChat"
      :colors="colors"
      :isOpen="isChatOpen"
      :messageList="messageList"
      :messageStyling="messageStyling"
      :newMessagesCount="newMessagesCount"
      :onMessageWasSent="onMessageWasSent"
      :open="openChat"
      :participants="participants"
      :showCloseButton="true"
      :showLauncher="true"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :showEdition="true"
      :showDeletion="true"
      :showConfirmationDeletion="true"
      :confirmationDeletionMessage="'Are you sure? (you can customize this message)'"
      :titleImageUrl="titleImageUrl"
      :disableUserListToggle="false"
      :chatListImageUrl="chatListImageUrl"
      :placeholder="placeholder"
      :multipleChatsEnabled="multipleChatsEnabled"
      :chatList="chatList"
      :chatListTitle="chatListTitle"
      @onType="handleOnType"
      @edit="editMessage"
      @remove="removeMessage"
      @changeCurrentChat="handleChangeCurrentChat"
      @messageListMountedUpdated="handleMessageListMountedUpdated"
      @messageListHeaderTitleClicked="messageListHeaderTitleClicked"
      @chatListHeaderTitleClicked="chatListHeaderTitleClicked"
      @messageIconClicked="messageIconClicked"
    >
      <template v-slot:text-message-toolbox="scopedProps">
        <button v-if="!scopedProps.me && scopedProps.message.type==='text'" @click.prevent="like(scopedProps.message.id)">
          👍
        </button>
      </template>
      <template v-slot:text-message-body="scopedProps"> 
        <p class="sc-message--text-content" v-html="scopedProps.messageText"></p>
        <p v-if="scopedProps.message.data.meta" class='sc-message--meta' :style="{color: scopedProps.messageColors.color}">{{scopedProps.message.data.meta}}</p>
        <p v-if="scopedProps.message.isEdited || scopedProps.message.liked" class='sc-message--edited'>
          <template v-if="scopedProps.message.isEdited">✎</template>
          <template v-if="scopedProps.message.liked">👍</template>
        </p>
      </template>
      <template v-slot:system-message-body="{ message }">
        [System]: {{message.text}}
      </template>
    </beautiful-chat>
    <p class="text-center toggle">
      <a
        :style="{color: linkColor}"
        @click.prevent="openChat()"
        href="#"
        v-if="!isChatOpen"
      >Open the chat window</a>
      <a
        :style="{color: linkColor}"
        @click.prevent="closeChat()"
        href="#"
        v-else
      >Close the chat window</a>
    </p>
    <p class="text-center colors">
      <a
        :style="{background: availableColors.blue.launcher.bg}"
        @click.prevent="setColor('blue')"
        href="#"
      >Blue</a>
      <a
        :style="{background: availableColors.red.launcher.bg}"
        @click.prevent="setColor('red')"
        href="#"
      >Red</a>
      <a
        :style="{background: availableColors.green.launcher.bg}"
        @click.prevent="setColor('green')"
        href="#"
      >Green</a>
      <a
        :style="{background: availableColors.dark.launcher.bg}"
        @click.prevent="setColor('dark')"
        href="#"
      >Dark</a>
    </p>
    <v-dialog/>
    <p class="text-center messageStyling">
      <label>Message styling enabled?
        <input
          @change="messageStylingToggled"
          checked
          type="checkbox"
        >
      </label>
      <a
        @click.prevent="showStylingInfo()"
        href="#"
      >info</a>
    </p>
    <TestArea
      :chosenColor="chosenColor"
      :colors="colors"
      :messageStyling="messageStyling"
      :onMessage="sendMessage"
      :onTyping="handleTyping"
      :multipleChatsEnabled="multipleChatsEnabled"
      :chatList="chatList"
      @multipleChatsEnabledChange="handleMultipleChatsEnabledChange"
    />
    <Footer
      :chosenColor="chosenColor"
      :colors="colors"
    />
  </div>
</template>

<script>
import chatHistory from './messageHistory'
import Header from './Header.vue'
import Footer from './Footer.vue'
import TestArea from './TestArea.vue'
import availableColors from './colors'

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    TestArea
  },
  data() {
    return {
      titleImageUrl: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      chatListImageUrl: "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
      chatHistory: chatHistory,
      isChatOpen: false,
      showTypingIndicator: '',
      colors: null,
      availableColors,
      chosenColor: null,
      alwaysScrollToBottom: true,
      messageStyling: true,
      userIsTyping: false,
      placeholder: 'Write something...',
      multipleChatsEnabled: true,
      currentChatID: Object.keys(chatHistory)[0],
      chatListTitle: 'My chats'
    }
  },
  created() {
    this.setColor('blue')
  },
  methods: {
    sendMessage(text, chatID) {
      if (text.length > 0) {
        this.onMessageWasSent({
          author: 'support',
          type: 'text',
          id: Math.random(),
          data: { text }
        }, chatID)
      }
    },
    handleTyping(text, chatID) {
      this.showTypingIndicator =
        text.length > 0 && (chatID === undefined || this.currentChatID == chatID)
          ? this.participants[this.participants.length - 1].id
          : ''
    },
    onMessageWasSent(message, chatID) {
      const msg = Object.assign({}, message, {id: Math.random(), read: (message.author === this.myId)})
      if (chatID !== undefined) {
        this.chatMessageList(chatID).push(msg)
      } else {
        this.messageList.push(msg)
      }
    },
    openChat() {
      this.isChatOpen = true
    },
    closeChat() {
      this.isChatOpen = false
    },
    setColor(color) {
      this.colors = this.availableColors[color]
      this.chosenColor = color
    },
    showStylingInfo() {
      this.$modal.show('dialog', {
        title: 'Info',
        text:
          'You can use *word* to <strong>boldify</strong>, /word/ to <em>emphasize</em>, _word_ to <u>underline</u>, `code` to <code>write = code;</code>, ~this~ to <del>delete</del> and ^sup^ or ¡sub¡ to write <sup>sup</sup> and <sub>sub</sub>'
      })
    },
    messageStylingToggled(e) {
      this.messageStyling = e.target.checked
    },
    handleOnType() {
      this.$root.$emit('onType')
      this.userIsTyping = true
    },
    editMessage(message){
      const m = this.messageList.find(m => m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    },
    removeMessage(message){
      const m = this.messageList.find(m => m.id === message.id);
      m.type = 'system';
      m.data.text = 'This message has been removed';
    },
    handleChangeCurrentChat(newCurrentChatID) {
      this.showTypingIndicator = ''
      this.currentChatID = newCurrentChatID
      const chat = this.chatHistory[this.currentChatID]
      this.titleImageUrl = chat.imageUrl
      this.title = chat.name
    },
    handleMultipleChatsEnabledChange(newMultipleChatsEnabled) {
      this.multipleChatsEnabled = newMultipleChatsEnabled
      this.currentChatID = Object.keys(this.chatHistory)[0]
    },
    handleMessageListMountedUpdated() {
      if (this.isChatOpen) {
        this.markCurrentChatRead()
      }
    },
    messageListHeaderTitleClicked() {
      console.log("messageListHeaderTitleClicked")
    },
    chatListHeaderTitleClicked() {
      console.log("chatListHeaderTitleClicked")
    },
    messageIconClicked(user) {
      console.log("messageIconClicked user:")
      console.log(user)
    },
    like(id){
      const m = this.messageList.findIndex(m => m.id === id);
      var msg = this.messageList[m];
      msg.liked = !msg.liked;
      this.$set(this.messageList, m, msg);
    },
    markCurrentChatRead() {
      this.messageList.forEach((msg) => {
        if (!msg.read) {
          msg.read = true
        }
      })
    },
    chatMessageList(chatID) {
      const chat = this.chatHistory[chatID];
      if (chat === undefined) {
        return undefined;
      }
      return chat.messages;
    },
  },
  computed: {
    linkColor() {
      return this.chosenColor === 'dark'
        ? this.colors.sentMessage.text
        : this.colors.launcher.bg
    },
    backgroundColor() {
      return this.chosenColor === 'dark' ? this.colors.messageList.bg : '#fff'
    },
    messageList() {
      const chat = this.chatHistory[this.currentChatID];
      if (chat === undefined) {
        return undefined;
      }
      return chat.messages;
    },
    participants() {
      const chat = this.chatHistory[this.currentChatID];
      if (chat === undefined) {
        return [];
      }
      return chat.participants;
    },
    chatList() {
      var chats = []
      Object.entries(this.chatHistory).forEach(([chatKey, chat]) => {
        var unreadCount = 0
        chat.messages.forEach((msg) => {
          if (!msg.read) {
            unreadCount++
          }
        })
        chats.push(
          {
            id: chatKey,
            name: chat.name,
            imageUrl: chat.imageUrl,
            unreadCount: unreadCount
          }
        )
      })
      return chats
    },
    newMessagesCount() {
      var totalUnreadCount = 0
      this.chatList.forEach((chat) => {
        totalUnreadCount += chat.unreadCount
      })
      return totalUnreadCount
    }
  },
  mounted(){
    Object.entries(this.chatHistory).forEach(([_, chat]) => {
      chat.messages.forEach(msg => msg.liked = false)
    })
  }
}
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}

* {
  font-family: Avenir Next, Helvetica Neue, Helvetica, sans-serif;
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
  font-family: Avenir Next, Helvetica Neue, Helvetica, sans-serif;
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

.messageStyling {
  font-size: small;
}
</style>
