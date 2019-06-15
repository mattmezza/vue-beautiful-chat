<template>
  <div class="sc-message--text" :style="messageColors">
    <template v-if="me">
      <div class="sc-message--toolbox" :style="{background: messageColors.backgroundColor}">
        <button @click="edit" :disabled="isEditing">
          <icon-base :color="isEditing? 'black': 'white'" width="10" icon-name="edit">
            <icon-edit />
          </icon-base>
        </button>
      </div>
    </template>
    <p class="sc-message--text-content" v-html="messageText"></p>
    <p v-if="message.data.meta" class='sc-message--meta' :style="{color: messageColors.color}">{{message.data.meta}}</p>
    <p v-if="message.isEdited" class='sc-message--edited'>
      <icon-base width="10" icon-name="edited">
        <icon-edit />
      </icon-base> edited
    </p>
  </div>
</template>

<script>
import IconBase from './components/IconBase.vue'
import IconEdit from './components/icons/IconEdit.vue'
import escapeGoat from 'escape-goat'
import Autolinker from 'autolinker'
import store from "./store/"
const fmt = require('msgdown')

export default {
  data() {
    return {
      store
    }
  },
  props: {
    message:{
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
    }
  },
  computed: {
    messageText() {
      const escaped = escapeGoat.escape(this.message.data.text)

      return Autolinker.link(this.messageStyling ? fmt(escaped) : escaped, {
        className: 'chatLink',
        truncate: { length: 50, location: 'smart' }
      })
    },
    me(){
      return this.message.author === 'me';
    },
    isEditing() {
      return (store.editMessage && store.editMessage.id) == this.message.id;
    }
  },
  methods:{
    edit() {
      this.store.editMessage = this.message;
    }
  },
  components:{
    IconBase,
    IconEdit
  }
}
</script>

<style scoped>
a.chatLink {
  color: inherit !important;
}
</style>
