<template>
  <div class="sc-message--file" :style="messageColors">
    <template>
      <div class="sc-message--toolbox" :style="{background: messageColors.backgroundColor}">
        <button
          v-if="showDeletion && me && message.id != null && message.id != undefined"
          @click="
            ifelse(
              showConfirmationDeletion,
              withConfirm(confirmationDeletionMessage, () => $emit('remove')),
              () => $emit('remove')
            )()
          "
        >
          <IconBase :color="messageColors.color" width="10" icon-name="remove">
            <IconCross />
          </IconBase>
        </button>
        <slot name="file-message-toolbox" :message="message" :me="me"></slot>
      </div>
    </template>
    <slot :message="message" :messageColors="messageColors" :me="me">
      <div class="sc-message--file-icon">
        <img :src="message.data.file.url" class="sc-image" />
      </div>
      <div class="sc-message--file-name" :style="messageColors">
        <a :href="message.data.file.url ? message.data.file.url : '#'" target="_blank">
          {{ message.data.file.name || '' }}
        </a>
      </div>
      <div class="sc-message--file-text" :style="messageColors">
        {{ message.data.text }}
        <p v-if="message.data.meta" class="sc-message--meta" :style="messageColors">
          {{ message.data.meta }}
        </p>
      </div>
    </slot>
  </div>
</template>

<script>
import IconBase from './../components/IconBase.vue'
import IconCross from './../components/icons/IconCross.vue'

export default {
  components: {
    IconBase,
    IconCross,
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    },
    showDeletion: {
      type: Boolean,
      default: false,
      required: false
    },
    showConfirmationDeletion: {
      type: Boolean,
      default: false,
      required: false
    },
    confirmationDeletionMessage: {
      type: String,
      default: false,
      required: false
    },
    myId: {
      type: String,
      required: true
    }
  },
  computed: {
    me () {
      return this.message.author === this.myId
    }
  },
  methods: {
    ifelse (cond, funcIf, funcElse) {
      return () => {
        if (funcIf && cond) funcIf()
        else if (funcElse) funcElse()
      }
    },
    withConfirm (msg, func) {
      return () => {
        if (confirm(msg)) func()
      }
    }
  }
}
</script>

<style scoped>
.sc-message--file {
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-message--content.sent .sc-message--file {
  word-wrap: break-word;
}

.sc-message--file-icon {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 0px;
}

.sc-image {
  max-width: 100%;
  min-width: 100%;
}

.sc-message--file-text {
  padding: 17px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-message--file-name {
  color: white;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0;
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
</style>
