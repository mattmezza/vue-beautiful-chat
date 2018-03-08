<template>
  <div class="sc-message--text">
    {{data.text}}
    <p v-if="data.meta" class='sc-message--meta'>{{data.meta}}</p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
