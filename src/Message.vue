<template>
  <div class="sc-message">
    <div class="sc-message--content" :class="{sent: message.author === 'me', received: message.author !== 'me'}">
      <div class="sc-message--avatar" :style="{
        backgroundImage: `url(./assets/chat-icon.svg)`
      }"></div>
      <TextMessage v-if="message.type === 'text'" :data="message.data" />
      <TextMessage v-else-if="message.type === 'emoji'" :data="message.data" />
      <TextMessage v-else-if="message.type === 'file'" :data="message.data" />
    </div>
  </div>
</template>

<script>
import TextMessage from './TextMessage.vue'

export default {
  components: {
    TextMessage
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.sc-message {
  width: 300px;
  margin: auto;
  padding-bottom: 10px;
  display: flex;
}

.sc-message--content {
  width: 100%;
  display: flex;
}

.sc-message--content.sent {
  justify-content: flex-end;
}

.sc-message--content.sent .sc-message--avatar {
  display: none;
}

.sc-message--avatar {
  background-image: url(https://d13yacurqjgara.cloudfront.net/assets/avatar-default-aa2eab7684294781f93bc99ad394a0eb3249c5768c21390163c9f55ea8ef83a4.gif);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  align-self: center;
  margin-right: 15px;
}

.sc-message--text {
  padding: 17px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--content.sent .sc-message--text {
  color: white;
  background-color: #4e8cff;
  max-width: calc(100% - 120px);
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--text {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.sc-message--file {
  border-radius: 6px;
  background-color: #4e8cff;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--content.sent .sc-message--file {
  color: white;
  background-color: #4e8cff;
  word-wrap: break-word;
}

.sc-message--file-icon {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 0px;
}

.sc-message--file-icon:hover {
  opacity: 0.7;
}

.sc-message--file-text {
  padding: 12px 15px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.sc-message--file-name {
  color: white;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0;
  padding-bottom: 12px;
  font-size: x-small;
  text-align: center;
}

.sc-message--file-name a {
  text-decoration: none;
  color: #ece7e7;
}

.sc-message--file-name a:hover {
  color: white;
}

.sc-message--content.sent .sc-message--file-text {
  color: white;
  background-color: #4e8cff;
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--file {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.sc-message--content.received .sc-message--file-name {
  color: #000;
}

.sc-message--content.received .sc-message--file a {
  color: rgba(43, 40, 40, 0.7);
}

.sc-message--content.received .sc-message--file a:hover {
  color: #0c0c0c;
}

.sc-message--emoji {
  font-size: 40px;
}

.sc-message--meta {
  font-size: xx-small;
  margin-bottom: -10px;
  color: white;
  text-align: center;
}

@media (max-width: 450px) {
  .sc-message {
    width: 80%;
  }
}
</style>
