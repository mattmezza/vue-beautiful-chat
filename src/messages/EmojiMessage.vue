<template>
  <div>
    <p v-if="!me" class="sc-message--text-content sc-message--text-author" v-html="'~' + authorName"></p>
    <div class="sc-message--emoji">{{ data.emoji }}</div>
    <p v-if="data.meta" class="sc-message--meta" style="color: black;">
      {{ data.meta }}
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
    }
  },
  computed: {
    me() {
      return this.author === 'me'
    }
  }
}
</script>

<style scoped>
.sc-message--emoji {
  font-size: 40px;
}
</style>
