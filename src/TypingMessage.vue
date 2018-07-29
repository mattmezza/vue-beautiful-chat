<template>
  <div class="sc-typing-indicator" :style="messageColors">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script>
export default {
  props: {
    messageColors: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.sc-typing-indicator {
  text-align: center;
  padding: 17px 20px;
  border-radius: 6px;
}

.sc-typing-indicator span {
  display: inline-block;
  background-color: #B6B5BA;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  margin-right: 3px;
  animation: bob 2s infinite;
}

/* SAFARI GLITCH */
.sc-typing-indicator span:nth-child(1) {
  animation-delay: -1s;
}
.sc-typing-indicator span:nth-child(2) {
  animation-delay: -0.85s;
}
.sc-typing-indicator span:nth-child(3) {
  animation-delay: -0.7s;
}

@keyframes bob {
  10% {
    transform: translateY(-10px);
    background-color: #9E9DA2;
  }
  50% {
    transform: translateY(0);
    background-color: #B6B5BA;
  }
}
</style>
