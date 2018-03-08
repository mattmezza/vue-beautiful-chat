<template>
  <div>
    <div v-if="file" class='file-container' >
      <span class='icon-file-message'><img src="./assets/file.svg" alt='genericFileIcon' height="15" /></span>
      {{file.name}}
      <span class='delete-file-message' @click="cancelFile()" ><img src="./assets/close-icon.png" alt='close icon' height="10" title='Remove the file' /></span>
    </div>
    <form class="sc-user-input" :class="{active: inputActive}">
      <div
        role="button"
        tabIndex="0"
        @focus="setInputActive(true)"
        @blur="setInputActive(false)"
        @keydown="handleKey"
        contentEditable="true"
        placeholder="Write a reply..."
        class="sc-user-input--text"
      >
      </div>
      <div class="sc-user-input--buttons">
        <div class="sc-user-input--button"></div>
        <div class="sc-user-input--button">
          <EmojiIcon v-if="showEmoji" :onEmojiPicked="_handleEmojiPicked" />
        </div>
        <div v-if="showFile" class="sc-user-input--button">
          <FileIcons :onChange="_handleFileSubmit" />
        </div>
        <div className="sc-user-input--button">
          <SendIcon :onClick="_submitText" />
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import EmojiIcon from './EmojiIcon.vue'
import FileIcons from './FileIcons.vue'
import SendIcon from './SendIcon.vue'

export default {
  components: {
    EmojiIcon,
    FileIcons,
    SendIcon
  },
  props: {
    showEmoji: {
      type: Boolean,
      default: () => false
    },
    showFile: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      file: null,
      inputActive: false
    }
  },
  methods: {
    cancelFile () {
      this.file = null
    },
    setInputActive (onoff) {
      this.inputActive = onoff
    },
    handleKey (event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        this._submitText(event)
      }
    },
    _submitText(event) {
      event.preventDefault();
      const text = this.userInput.textContent;
      const file = this.file
      if (file) {
        if (text && text.length > 0) {
          this.onSubmit({
            author: 'me',
            type: 'file',
            data: { text, file }
          });
          this.file = null
          this.userInput.innerHTML = ''
        } else {
          this.onSubmit({
            author: 'me',
            type: 'file',
            data: { file }
          });
          this.file = null
        }
      } else {
        if (text && text.length > 0) {
          this.onSubmit({
            author: 'me',
            type: 'text',
            data: { text }
          });
          this.userInput.innerHTML = '';
        }
      }
    },
    _handleEmojiPicked(emoji) {
      this.onSubmit({
        author: 'me',
        type: 'emoji',
        data: { emoji }
      });
    },
    _handleFileSubmit(file) {
      this.setState({ file })
    }
  }
}
</script>

<style scoped>
.sc-user-input {
  min-height: 55px;
  margin: 0px;
  position: relative;
  bottom: 0;
  display: flex;
  background-color: #f4f7f9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: background-color .2s ease,box-shadow .2s ease;
}


.sc-user-input--text {
  width: 300px;
  resize: none;
  border: none;
  outline: none;
  border-bottom-left-radius: 10px;
  box-sizing: border-box;
  padding: 18px;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.33;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #565867;
  -webkit-font-smoothing: antialiased;
  max-height: 200px;
  overflow: scroll;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.sc-user-input--text:empty:before {
  content: attr(placeholder);
  display: block; /* For Firefox */
  color: rgba(86, 88, 103, 0.3);
  outline: none;
}

.sc-user-input--buttons {
  width: 100px;
  position: absolute;
  right: 30px;
  height: 100%;
  display: flex;
}

.sc-user-input--button:first-of-type {
  width: 40px;
}

.sc-user-input--button {
  width: 30px;
  height: 55px;
  padding-left: 3px;
  padding-right: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sc-user-input.active {
  box-shadow: none;
  background-color: white;
  box-shadow: 0px -5px 20px 0px rgba(150, 165, 190, 0.2);
}

.sc-user-input--send-icon, .sc-user-input--file-icon {
  height: 20px;
  width: 20px;
  cursor: pointer;
  align-self: center;
  outline: none;
}

.sc-user-input--button label {
  position: relative;
  height: 24px;
  padding-left: 3px;
  cursor: pointer;
}

.sc-user-input--button label:hover path {
  fill: rgba(86, 88, 103, 1);
}

.sc-user-input--button input {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 99999;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  overflow: hidden;
}

.file-container {
  background-color: #f4f7f9;
  border-top-left-radius: 10px;
  padding: 5px 20px;
  color: #565867;
}

.delete-file-message {
  font-style: normal;
  float: right;
  cursor: pointer;
  color: #c8cad0;
}

.delete-file-message:hover {
  color: #5d5e6d;
}

.icon-file-message {
  margin-right: 5px;
}

.sc-user-input--send-icon path, .sc-user-input--file-icon path {
  fill: rgba(86, 88, 103, 0.3);
}

.sc-user-input--send-icon:hover path, .sc-user-input--file-icon:hover path {
  fill: rgba(86, 88, 103, 1);
}

.sc-user-input--emoji-icon-wrapper,
.sc-user-input--send-icon-wrapper,
.sc-user-input--file-icon-wrapper {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
}

.sc-user-input--emoji-icon-wrapper:focus {
  outline: none;
}

.sc-user-input--emoji-icon {
  height: 18px;
  cursor: pointer;
  align-self: center;
}

.sc-user-input--emoji-icon path, .sc-user-input--emoji-icon circle {
  fill: rgba(86, 88, 103, 0.3);
}

.sc-user-input--emoji-icon-wrapper:focus .sc-user-input--emoji-icon path,
.sc-user-input--emoji-icon-wrapper:focus .sc-user-input--emoji-icon circle,
.sc-user-input--emoji-icon.active path,
.sc-user-input--emoji-icon.active circle,
.sc-user-input--emoji-icon:hover path,
.sc-user-input--emoji-icon:hover circle {
  fill: rgba(86, 88, 103, 1);
}
</style>
