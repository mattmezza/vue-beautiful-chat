<template>
  <div
    tabIndex="0"
    @blur="onBlur"
    class="sc-emoji-picker"
  >
    <div class="sc-emoji-picker--content">
      <div v-for="category in emojiData" class="sc-emoji-picker--category" :key="category.name">
        <div class="sc-emoji-picker--category-title">{{category.name}}</div>
          <span
            v-for="emoji in category.emojis"
            :key="emoji"
            class="sc-emoji-picker--emoji"
            @click="emojiClicked(emoji)"
          >
            {{emoji}}
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import emojiData from './emojiData'

export default {
  data () {
    return {
      emojiData
    }
  },
  props: {
    onBlur: {
      type: Function,
      required: true
    },
    onEmojiPicked: {
      type: Function,
      required: true
    }
  },
  methods: {
    emojiClicked (emoji) {
      this.onEmojiPicked(emoji);
      // this.domNode.blur();
    }
  }
}
</script>
