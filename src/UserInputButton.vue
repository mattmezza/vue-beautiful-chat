<template>
  <button class="sc-user-input--button-icon-wrapper">
      <icon-base :color="color" width="20" height="20" :icon-name="tooltip">
        <slot />
      </icon-base>
    </button>
</template>

<script>
import IconBase from "./components/IconBase.vue";

export default {
  props: {
    color: {
      type: String,
      required: true
    },
    tooltip: {
        type: String,
        required: false,
        default: ''
    }
  },
  components:{
    IconBase
  }
}
</script>

<style scoped>
.sc-user-input--button-icon-wrapper {
  background: none;
  border: none;
  padding: 0px;
  margin: 0px;
  outline: none;
  cursor: pointer;
  &:focus{
    outline: none;
  }
  svg {
    height: 20px;
    width: 20px;
    cursor: pointer;
    align-self: center;
    outline: none;
    &:hover path{
      filter: contrast(15%);
    }
  }
}
</style>
