<template>
  <div>
    <div class="sc-launcher" :class="{opened: isOpen}" @click="toggle">
      <!-- <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} /> -->
      <img class="sc-open-icon" src="./assets/close-icon.png" />
      <img class="sc-closed-icon" src="./assets/logo-no-bg.svg" />
    </div>
    <ChatWindow
      :messageList="messageList"
      :onUserInputSubmit="onMessageWasSent"
      :agentProfile="agentProfile"
      :isOpen="isOpen"
      :onClose="toggle"
      :showEmoji="showEmoji"
      :showFile="showFile"
    />
  </div>
</template>
<script>
import ChatWindow from './ChatWindow.vue'

export default {
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
    'onMessageWasSent': {
      type: Function,
      required: true
    },
    'messageList': {
      type: Array,
      default: () => []
    }
  },
  components: {
    ChatWindow
  },
  data () {
    return {
      isOpen: true
    }
  },
  computed: {

  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
<style scoped>
.sc-launcher {
  width: 60px;
  height: 60px;
  background-color: #4e8cff;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  right: 25px;
  bottom: 25px;
  border-radius: 50%;
  box-shadow: none;
  transition: box-shadow 0.2s ease-in-out;
}

.sc-launcher:before {
  content: '';
  position: relative;
  display: block;
  width: 60px;
  height: 60px;  
  border-radius: 50%;
  transition: box-shadow 0.2s ease-in-out;
}

.sc-launcher .sc-open-icon,
.sc-launcher .sc-closed-icon {
  width: 60px;
  height: 60px;
  position: fixed;
  right: 25px;
  bottom: 25px;
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
}

.sc-launcher .sc-closed-icon {
  transition: opacity 100ms ease-in-out, transform 100ms ease-in-out;
  width: 60px;
  height: 60px;
}

.sc-launcher .sc-open-icon {
  padding: 20px;
  box-sizing: border-box;
  opacity: 0;
}

.sc-launcher.opened .sc-open-icon {
  transform: rotate(-90deg);
  opacity: 1;
}

.sc-launcher.opened .sc-closed-icon {
  transform: rotate(-90deg);
  opacity: 0;
}

.sc-launcher.opened:before {
  box-shadow: 0px 0px 400px 250px rgba(148, 149, 150, 0.2);
}

.sc-launcher:hover {
  box-shadow: 0 0px 27px 1.5px rgba(0,0,0,0.2);
}

.sc-new-messsages-count {
  position: absolute;
  top: -3px;
  left: 41px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
	width: 22px;
  height: 22px;
  background: #ff4646;
  color: white;
  text-align: center;
  margin: auto;
  font-size: 12px;
  font-weight: 500;
}
</style>
