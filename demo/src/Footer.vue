<template>
  <div class="demo-footer">
    <div>
      <div>&copy; {{new Date().getFullYear()}} mattmezza/vue-beautiful-chat</div>
      <div><a href="https://www.npmjs.com/package/vue-beautiful-chat" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/vue-beautiful-chat.svg" />
</a></div>
    </div>
    <div>
      <div>Check the React version <a href="https://mattmezza.github.io/react-beautiful-chat/" target="new">react-beautiful-chat</a></div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.demo-footer {
  max-width: 1100px;
  display: flex;
  margin: auto;
  justify-content: space-between;
  padding: 20px 0px;
  border-top: solid 2px #F0F4FA;
  color: #8694AB;
  font-weight: 100;
  font-size: 14px;
}
</style>
