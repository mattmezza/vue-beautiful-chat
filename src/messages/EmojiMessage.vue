<template>
  <div class="sc-message--text" :style="messageColors">
    <p
      v-if="!me"
      class="sc-message--text-content sc-message--text-author"
      v-html="'~' + authorName"
    ></p>
    <div class="sc-message--emoji">{{ data.emoji }}</div>
    <p v-if="data.meta" class="sc-message--meta" :style="{color: messageColors.color}">
      {{ date }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    }
  },
  computed: {
    me() {
      return this.author === 'me'
    },
    date() {
      let fullDate = this.data.meta.split(' - ')
      let parts = fullDate[0].split('.')
      const timestamp = new Date(parts[2], parts[1] - 1, parts[0])
      const now = new Date()
      if (this.datesAreOnSameDay(now, timestamp)) {
        return 'Heute | ' + fullDate[1]
      } else {
        return this.data.meta
      }
    }
  },
  methods: {
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
.sc-message--text {
  text-align: center;
}
.sc-message--emoji {
  font-size: 40px;
}
</style>
