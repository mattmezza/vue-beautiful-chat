<template>
  <div>
    <div class="sc-message--emoji">{{ data.emoji }}</div>
    <p v-if="data.meta" class="sc-message--meta" style="color:black">
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
    messageColors: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.sc-message--emoji {
  font-size: 40px;
}
</style>
