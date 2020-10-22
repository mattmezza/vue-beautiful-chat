<template>
  <div class="sc-header" :style="{background: colors.header.bg, color: colors.header.text}">
    <div
      v-if="showChatListButton"
      class="bi bi-chevron-left sc-header--chat-list-button"
      @click="showChatList"
    >
      <svg
        class="sc-header--svg-button"
        height="15px"
        width="15px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <path
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        ></path>
      </svg>
    </div>
    <slot>
      <img v-if="titleImageUrl" class="sc-header--img" :src="titleImageUrl" alt="" />
      <div
        v-if="!disableListToggle"
        class="sc-header--title enabled"
        @click="toggleUserListMessageList"
      >
        {{ title }}
      </div>
      <div v-else class="sc-header--title">{{ title }}</div>
    </slot>
    <div v-if="showCloseButton" class="sc-header--close-button" @click="$emit('close')">
      <img :src="icons.close.img" :alt="icons.close.name" />
    </div>
  </div>
</template>

<script>
import {mapState} from './store/'
import CloseIcon from './assets/close-icon-big.png'

export default {
  props: {
    icons: {
      type: Object,
      default: function () {
        return {
          close: {
            img: CloseIcon,
            name: 'default'
          }
        }
      }
    },
    title: {
      type: String,
      required: true
    },
    colors: {
      type: Object,
      required: true
    },
    showChatListButton: {
      type: Boolean,
      default: false
    },
    disableListToggle: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState(['titleImageUrl', 'showCloseButton'])
  },
  methods: {
    toggleUserListMessageList() {
      this.$emit('toggleUserListMessageList')
    },
    showChatList() {
      this.$emit('showChatList')
    }
  }
}
</script>

<style scoped>
.sc-header {
  min-height: 75px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  padding: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  box-sizing: border-box;
  display: flex;
}

.sc-header--img {
  border-radius: 50%;
  align-self: center;
  padding: 10px;
  box-sizing: border-box;
  width: 54px;
  height: 54px;
}

.sc-header--title {
  align-self: center;
  padding: 10px;
  flex: 1;
  user-select: none;
  font-size: 20px;
  text-align: left;
}

.sc-header--title.enabled {
  cursor: pointer;
  border-radius: 5px;
}

.sc-header--title.enabled:hover {
  box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, 0.1);
}

.sc-header--close-button {
  width: 40px;
  align-self: center;
  height: 40px;
  margin-right: 10px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
  margin-left: auto;
}

.sc-header--close-button:hover {
  box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, 0.1);
}

.sc-header--close-button img {
  width: 100%;
  height: 100%;
  padding: 13px;
  box-sizing: border-box;
}

.sc-header--chat-list-button {
  width: 40px;
  align-self: center;
  height: 40px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
  margin-left: auto;
  display: flex;
  align-items: center;
}

.sc-header--chat-list-button:hover {
  box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, 0.1);
}

.sc-header--svg-button {
  margin: 0 auto;
  display: block;
  fill: white;
}

@media (max-width: 450px) {
  .sc-header {
    border-radius: 0px;
  }
}
</style>
