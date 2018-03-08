<template>
<div id="app">
  <beautiful-chat :agentProfile="agentProfile" :onMessageWasSent="handleMessageSent" :messageList="messageList" />
</div>
</template>

<script>
import messageHistory from './messageHistory'

export default {
  name: 'app',
  components: {},
  data() {
    return {
      agentProfile: {
        teamName: 'Prova',
        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
      },
      messageList: messageHistory
    }
  },
  methods: {
    handleMessageSent (msg) {
      console.log(msg)
    }
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 50px;
  cursor: default;
  box-sizing: border-box;
}
pre {
  color: #595959;
  background-color: #f3f3f3;
  border: 1px solid #eee;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
h1,
h2 {
  font-weight: normal;
  a {
    font-size: 12px;
  }
}
a {
  color: inherit;
}
button.btn {
  outline: none;
  background: white;
  border: 0;
  padding: 6px 18px;
  cursor: pointer;
  border-radius: 3px;
  background: white;
  color: #4db3ff;
  border: 1px solid #4db3ff;
  min-width: 90px;
  margin-bottom: 2px;
  margin-top: 4px;
  &:hover {
    color: #20a0ff;
    border: 1px solid #20a0ff;
  }
  &.green {
    $color: #50C9BA;
    color: $color;
    border: 1px solid $color;
    &:hover {
      color: mix($color, black, 95%);
      border: 1px solid mix($color, black, 95%);
    }
  }
  &.red {
    $color: #F21368;
    color: $color;
    border: 1px solid $color;
    &:hover {
      color: mix($color, black, 95%);
      border: 1px solid mix($color, black, 95%);
    }
  }
}
.example-modal-content {
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 13px;
  overflow: auto;
}
.vue-dialog button {
  letter-spacing: 1px;
}
@media (max-width:600px)  {
  body {
    padding: 10px;
  }
}
</style>