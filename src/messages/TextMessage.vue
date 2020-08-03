<template>
  <div class="sc-message--text" :style="messageColors">
    <template>
      <div class="sc-message--toolbox" :style="{background: messageColors.backgroundColor}">
        <button v-if="showEdition && me && message.id" @click="edit" :disabled="isEditing">
          <IconBase :color="isEditing? 'black': messageColors.color" width="10" icon-name="edit">
            <IconEdit />
          </IconBase>
        </button>
        <div v-if="showDeletion">
          <button v-if="me && message.id != null && message.id != undefined" @click="ifelse(showConfirmationDeletion, withConfirm('Do you really want to delete the message?', () => $emit('remove')), () => $emit('remove'))()">
            <IconBase :color="messageColors.color" width="10" icon-name="remove">
              <IconCross />
            </IconBase>
          </button>
        </div>
        <slot name="text-message-toolbox" :message="message" :me="me"> </slot>
      </div>
    </template>
    <slot :message="message" :messageText="messageText" :messageColors="messageColors" :me="me">
      <p class="sc-message--text-content" v-html="messageText"></p>
      <p v-if="message.data.meta" class="sc-message--meta" :style="{color: messageColors.color}">
        {{ message.data.meta }}
      </p>
      <p v-if="message.isEdited" class="sc-message--edited">
        <IconBase width="10" icon-name="edited">
          <IconEdit />
        </IconBase>
        edited
      </p>
    </slot>
  </div>
</template>

<script>
import IconBase from './../components/IconBase.vue'
import IconEdit from './../components/icons/IconEdit.vue'
import IconCross from './../components/icons/IconCross.vue'
import escapeGoat from 'escape-goat'
import Autolinker from 'autolinker'
import store from './../store/'
const fmt = require('msgdown')

export default {
  data() {
    return {
      store
    }
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
    messageStyling: {
      type: Boolean,
      required: true
    },
    showEdition: {
      type: Boolean,
      required: true
    },
    showDeletion: {
      type: Boolean,
      required: true
    },
    showConfirmationDeletion: {
      type: Boolean,
      required: true
    },
  },
  computed: {
    messageText() {
      const escaped = escapeGoat.escape(this.message.data.text)

      return Autolinker.link(this.messageStyling ? fmt(escaped) : escaped, {
        className: 'chatLink',
        truncate: {length: 50, location: 'smart'}
      })
    },
    me() {
      return this.message.author === 'me'
    },
    isEditing() {
      return (store.editMessage && store.editMessage.id) == this.message.id
    }
  },
  methods: {
    edit() {
      this.store.editMessage = this.message
    },
    ifelse(cond, funcIf, funcElse) {
      return () => {
        if (funcIf && cond) funcIf()
        else if (funcElse) funcElse()
      }
    },
    withConfirm(msg, func) {
      return () => {
        if (confirm(msg)) {
          console.log(func)
          func()
        }
      }
    },
  },
  components:{
    IconBase,
    IconCross,
    IconEdit,
  }
}
</script>

<style scoped>
a.chatLink {
  color: inherit !important;
}
</style>
