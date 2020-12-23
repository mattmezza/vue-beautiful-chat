<template>
  <button class="sc-user-input--button-icon-wrapper">
    <IconBase
      :color="color"
      width="20"
      height="20"
      view-box="2.24 2.24 15.52 15.52"
      :icon-name="tooltip"
    >
      <slot />
    </IconBase>
  </button>
</template>

<script>
import IconBase from './components/IconBase.vue'

export default {
  components: {
    IconBase
  },
  props: {
    color: {
      type: String,
      required: true
    },
    tooltip: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.sc-user-input--button-icon-wrapper {
  display: block;
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
  cursor: pointer;
}
</style>
