<template>
  <div class="demo-header">
    <div class="demo-header--title">vue-beautiful-chat</div>
    <div class="demo-header--links">
      <a href="https://github.com/mattmezza/vue-beautiful-chat">GitHub</a><iframe
        src="https://ghbtns.com/github-btn.html?user=mattmezza&repo=vue-beautiful-chat&type=star&count=true"
        frameborder="0"
        scrolling="0"
        width="94px"
        height="20px"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.demo-header {
  width: 100%;
  color: #4e8cff;
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  margin: auto;
  padding: 40px 0px;
}

.demo-header--title {
  font-size: 24px;
  font-weight: 600;
}

.demo-header--links {
  width: 200px;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
}

.demo-header--links a {
  color: #4e8cff;
  text-decoration: none;
  cursor: pointer;
}

.demo-header--links a:hover {
  color: #4983ee;
}
</style>
