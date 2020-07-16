<template>
  <div class="sc-message--text" :style="messageColors">
    <template>
      <div class="sc-message--toolbox" :style="{background: messageColors.backgroundColor}">
        <button
          v-if="showEdition && me && message.id != null && message.id != undefined"
          :disabled="isEditing"
          @click="edit"
        >
          <IconBase :color="isEditing ? 'black' : messageColors.color" width="10" icon-name="edit">
            <IconEdit />
          </IconBase>
        </button>
        <button
          v-if="showDeletion && me && message.id != null && message.id != undefined"
          @click="$emit('remove')"
        >
          <IconBase :color="messageColors.color" width="10" icon-name="remove">
            <IconCross />
          </IconBase>
        </button>
        <slot name="text-message-toolbox" :message="message" :me="me"> </slot>
      </div>
    </template>
    <slot :message="message" :messageText="messageText" :messageColors="messageColors" :me="me">
      <p
        v-if="!me"
        class="sc-message--text-content sc-message--text-author"
        v-html="'~' + authorName"
      ></p>
      <p class="sc-message--text-content" v-html="messageText"></p>
      <p v-if="message.data.meta" class="sc-message--meta" :style="{color: messageColors.color}">
        {{ date }}
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
  components: {
    IconBase,
    IconCross,
    IconEdit
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
    authorName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      store
    }
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
    },
    date() {
      let fullDate = this.message.data.meta.split(' - ')
      let parts = fullDate[0].split('.')
      const timestamp = new Date(parts[2], parts[1] - 1, parts[0])
      const now = new Date()
      if (this.datesAreOnSameDay(now, timestamp)) {
        return 'Heute | ' + fullDate[1]
      } else {
        return this.message.data.meta
      }
    }
  },
  methods: {
    edit() {
      this.store.editMessage = this.message
    },
    datesAreOnSameDay(first, second) {
      const sameDay =
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
      return sameDay
    }
  }
}
</script>

<style scoped>
a.chatLink {
  color: inherit !important;
}
</style>
