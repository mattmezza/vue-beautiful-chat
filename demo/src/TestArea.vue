<template>
  <div class="demo-test-area--wrapper">
    <div class="demo-test-area--title">
      <div class="demo-test-area--title-main">vue-beautiful-chat demo</div>
      <div class="demo-test-area--title-sub">by <a href="https://matteo.merola.co">mattmezza</a></div>
    </div>
    <form class="demo-test-area" @submit.prevent="_handleSubmit" @keyup="_handleTyping">
      <div class="demo-test-area--preamble">Test the chat window by sending a message:</div>
      <textarea ref="textArea" class="demo-test-area--text" placeholder="Write a test message...." />
      <button class="demo-test-area--button"> Send Message! </button>
    </form>
    <p class="demo-test-area--info">
      <a href="https://github.com/mattmezza/vue-beautiful-chat">vue-beautiful-chat</a> is a chat window that allows you to build and add custom live chat to your sites. It includes only the vue chat widget. There is no backend, and no communication system baked in.
      <br />
      It is based on <a href="https://github.com/kingofthestack/react-live-chat">react-chat-window</a> and adds some features to it, like optional emoji and file messages.
      <br />
      <br />
      For instructions on how to use it click <a href="https://github.com/mattmezza/vue-beautiful-chat">here</a>.
      <br />
      <br />
    </p>
  </div>
</template>
<script>
export default {
  props: {
    onMessage: {
      type: Function,
      required: true
    },
    onTyping: {
      type: Function,
      required: true
    }
  },
  methods: {
    _handleSubmit () {
      this.onMessage(this.$refs.textArea.value)
      this.$refs.textArea.value = ''
    },
    _handleTyping () {
      this.onTyping(this.$refs.textArea.value)
    }
  }
}
</script>
<style scoped>
.demo-test-area--wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.demo-test-area--title {
  align-self: center;
  text-align: center;
}

.demo-test-area--title-main {
  color: #516996;
  font-weight: 600;
  font-size: 28px;
 }

.demo-test-area--title-sub {
  color: #4e8cff;
  padding-top: 10px;
  font-size: small;
}

.demo-test-area {
  align-self: center;
  margin-top: 30px;
  width: 400px;
  display: flex;
  flex-direction: column;
}

.demo-test-area--preamble {
  padding: 20px 0px;
  color: #516996;
}


.demo-test-area--button {
  font-family: Avenir Next, Helvetica Neue, Helvetica,sans-serif;
  font-weight: 400;
  margin-top: 20px;
  user-select: none;
  border: none;
  line-height: 1.4;
  text-decoration: none;
  background: #4e8cff;
  color: white;
  padding: 6px 10px;
  font-size: 20px;
  height: 50px;
  border-radius: 4px;
  width: 80%;
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  align-self: center;
}

.demo-test-area--button:hover {
  background: #4883f1;
}

.demo-test-area--info {
  margin: auto;
  margin-top: 40px;
  color: #516996;
  font-weight: 200;
  width: 550px;
}

.demo-test-area--info a {
  font-weight: 400;
  text-decoration: none;
  color: #4e8cff;
}
</style>
