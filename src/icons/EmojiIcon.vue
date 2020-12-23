<template>
  <div class="sc-user-input--picker-wrapper">
    <EmojiPicker v-if="isActive" :on-emoji-picked="onEmojiPicked" :on-blur="_handlePickerBlur" />
    <button class="sc-user-input--emoji-icon-wrapper" @click.prevent="_openPicker">
      <svg
        class="sc-user-input--emoji-icon"
        :class="{active: isActive}"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 37.4 37.4"
      >
        <path
          :style="{fill: color}"
          d="M18.7 37.4C8.39 37.4 0 29 0 18.7 0 8.39 8.39 0 18.7 0 29 0 37.4 8.39 37.4 18.7c0 10.3-8.4 18.7-18.7 18.7zm0-35.4C9.49 2 2 9.49 2 18.7c0 9.2 7.49 16.7 16.7 16.7 9.2 0 16.7-7.5 16.7-16.7C35.4 9.49 27.9 2 18.7 2z"
        />
        <circle :style="{fill: color}" cx="12.38" cy="14.36" r="1.94" />
        <circle :style="{fill: color}" cx="24.37" cy="14.41" r="1.99" />
        <path
          :style="{fill: color}"
          d="M18.04 27.45a10 10 0 01-8.45-4.35 1 1 0 011.7-1.04c.1.15 2.17 3.4 6.75 3.4 4.7 0 7.51-3.47 7.54-3.5a1 1 0 011.57 1.24c-.14.17-3.45 4.25-9.11 4.25z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import EmojiPicker from './../EmojiPicker.vue'

export default {
  components: {
    EmojiPicker
  },
  props: {
    onEmojiPicked: {
      type: Function,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    _openPicker(e) {
      this.isActive = !this.isActive
    },
    _handlePickerBlur() {
      this.isActive = false
    }
  }
}
</script>

<style scoped>
.sc-user-input--emoji-icon-wrapper {
  display: block;
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
  display: block;
  cursor: pointer;
}
</style>
