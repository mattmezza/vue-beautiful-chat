<template>
  <div class="sc-message--emoji">
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
        <slot name="emoji-message-toolbox" :message="message" :me="me"></slot>
      </div>
    </template>
    <slot :message="message" :messageColors="messageColors" :me="me">
      {{ message.data.emoji }}
    </slot>
  </div>
</template>

<script>
import IconBase from './../components/IconBase.vue'
import IconCross from './../components/icons/IconCross.vue'

export default {
  components: {
    IconBase,
    IconCross
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
      default: '',
      required: false
    },
    myId: {
      type: String,
      required: true
    }
  },
  computed: {
    me() {
      return this.message.author === this.myId
    }
  },
  methods: {
    ifelse(cond, funcIf, funcElse) {
      return () => {
        if (funcIf && cond) funcIf()
        else if (funcElse) funcElse()
      }
    },
    withConfirm(msg, func) {
      return () => {
        if (confirm(msg)) func()
      }
    }
  }
}
</script>

<style scoped>
.sc-message--emoji {
  font-size: 40px;
}
</style>
