<template>
  <div class="sc-message--text" :style="messageColors">
    {{data.text}}
    <p v-if="data.meta" class='sc-message--meta' :style="{color: messageColors.color}">
      {{data.meta}}
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

</style>
