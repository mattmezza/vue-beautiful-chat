<template>
  <div class="sc-chat-window" :class="{opened: isOpen, closed: !isOpen}">
    <Header
      v-if="showHeader"
      :show-chat-list-button="multipleChatsEnabled && !showingChatList"
      :title="showingChatList ? chatListTitle : title"
      :image-url="titleImageUrl"
      @close="$emit('close')"
      :colors="colors"
      :disable-user-list-toggle="disableUserListToggle || showingChatList"
      @toggleUserListMessageList="handleToggleUserListMessageList"
      @showChatList="handleShowChatList"
    >
      <template>
        <slot name="header"> </slot>
      </template>
    </Header>
    <UserList v-if="showingUserList" :colors="colors" :participants="participants" />
    <ChatList
      v-if="showingChatList"
      :colors="colors"
      :chatList="chatList"
      @changeCurrentChat="(chatID) => { this.$emit('changeCurrentChat', chatID) }"
      @showMessageList="handleShowMessageList"
      />
    <MessageList
      v-if="showingMessageList"
      :messages="messages"
      :participants="participants"
      :show-typing-indicator="showTypingIndicator"
      :colors="colors"
      :always-scroll-to-bottom="alwaysScrollToBottom"
      :show-edition="showEdition"
      :show-deletion="showDeletion"
      :show-confirmation-deletion="showConfirmationDeletion"
      :confirmation-deletion-message="confirmationDeletionMessage"
      :message-styling="messageStyling"
      @scrollToTop="$emit('scrollToTop')"
      @remove="$emit('remove', $event)"
      @messageListMountedUpdated="$emit('messageListMountedUpdated')"
    >
      <template v-slot:user-avatar="scopedProps">
        <slot name="user-avatar" :user="scopedProps.user" :message="scopedProps.message"> </slot>
      </template>
      <template v-slot:text-message-body="scopedProps">
        <slot
          name="text-message-body"
          :message="scopedProps.message"
          :messageText="scopedProps.messageText"
          :messageColors="scopedProps.messageColors"
          :me="scopedProps.me"
        >
        </slot>
      </template>
      <template v-slot:system-message-body="scopedProps">
        <slot name="system-message-body" :message="scopedProps.message"> </slot>
      </template>
      <template v-slot:text-message-toolbox="scopedProps">
        <slot name="text-message-toolbox" :message="scopedProps.message" :me="scopedProps.me">
        </slot>
      </template>
    </MessageList>
    <UserInput
      v-if="showingMessageList"
      :show-emoji="showEmoji"
      :on-submit="onUserInputSubmit"
      :suggestions="getSuggestions()"
      :show-file="showFile"
      :placeholder="placeholder"
      :colors="colors"
      @onType="$emit('onType')"
      @edit="$emit('edit', $event)"
    />
  </div>
</template>

<script>
import Header from './Header.vue'
import MessageList from './MessageList.vue'
import UserInput from './UserInput.vue'
import UserList from './UserList.vue'
import ChatList from './ChatList.vue'

const uiState = {
    MESSAGE_LIST: 'message-list',
    USER_LIST: 'user-list',
    CHAT_LIST: 'chat-list'
}

export default {
  components: {
    Header,
    MessageList,
    UserInput,
    UserList,
    ChatList
  },
  props: {
    showEmoji: {
      type: Boolean,
      default: false
    },
    multipleChatsEnabled: {
      type: Boolean,
      default: false
    },
    showFile: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    participants: {
      type: Array,
      required: true
    },
    chatList: {
      type: Array,
      required: false
    },
    chatListTitle: {
      type: String,
      default: 'Chats'
    },
    title: {
      type: String,
      required: true
    },
    onUserInputSubmit: {
      type: Function,
      required: true
    },
    messageList: {
      type: Array,
      default: () => []
    },
    isOpen: {
      type: Boolean,
      default: () => false
    },
    placeholder: {
      type: String,
      required: true
    },
    showTypingIndicator: {
      type: String,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    alwaysScrollToBottom: {
      type: Boolean,
      required: true
    },
    messageStyling: {
      type: Boolean,
      required: true
    },
    showEdition: {
      type: Boolean,
      required: true
    },
    showDeletion: {
      type: Boolean,
      required: true
    },
    showConfirmationDeletion: {
      type: Boolean,
      required: true
    },
    confirmationDeletionMessage: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      state: this.initialState()
    }
  },
  watch: {
    multipleChatsEnabled: function(newMultipleChatsEnabled) {
      this.state = this.initialState()
    }
  },
  computed: {
    messages() {
      let messages = this.messageList

      return messages
    },
    showingUserList() {
      return this.state == uiState.USER_LIST
    },
    showingChatList() {
      return this.state == uiState.CHAT_LIST
    },
    showingMessageList() {
      return this.state == uiState.MESSAGE_LIST
    }
  },
  methods: {
    handleToggleUserListMessageList() {
      this.state = (this.state == uiState.USER_LIST) ? uiState.MESSAGE_LIST : uiState.USER_LIST
    },
    handleShowChatList() {
      this.state = uiState.CHAT_LIST
    },
    handleShowMessageList() {
      this.state = uiState.MESSAGE_LIST
    },
    getSuggestions() {
      return this.messages.length > 0 ? this.messages[this.messages.length - 1].suggestions : []
    },
    initialState() {
      return this.multipleChatsEnabled ? uiState.CHAT_LIST : uiState.MESSAGE_LIST
    }
  }
}
</script>

<style scoped>
.sc-chat-window {
  width: 370px;
  height: calc(100% - 120px);
  max-height: 590px;
  position: fixed;
  right: 25px;
  bottom: 100px;
  box-sizing: border-box;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  animation: fadeIn;
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
}

.sc-chat-window.closed {
  opacity: 0;
  display: none;
  bottom: 90px;
}

@keyframes fadeIn {
  0% {
    display: none;
    opacity: 0;
  }

  100% {
    display: flex;
    opacity: 1;
  }
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
