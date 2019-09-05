<template>
  <div class="sc-message--system" :style="messageColors">
    <slot :message="data">
      {{data.text}}<p v-if="data.meta" class='sc-message--meta' :style="{color: messageColors.color}">{{data.meta}}</p>
    </slot>
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
.sc-message--system {
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.2;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased;
  font-style: italic;
  opacity: .55;
}

.sc-message--meta {
  font-size: xx-small;
  margin-bottom: 0px;
  margin-top: 5px;
  opacity: .5;
  text-align: center;
}
</style>
