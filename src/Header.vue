<template>
  <div class="sc-header">
    <img class="sc-header--img" :src="imageUrl" alt="" />
    <div class="sc-header--team-name"> {{teamName}} </div>
    <div class="sc-header--close-button" @click="onClose">
      <img src="./assets/close-icon.png" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    teamName: {
      type: String
    },
    onClose: {
      type: Function,
      required: true
    }
  }
}
</script>
<style scoped>
.sc-header {
  background: #4e8cff;
  min-height: 75px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  color: white;
  padding: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
  position: relative;
  box-sizing: border-box;
  display: flex;
}

.sc-header--img {
  border-radius: 50%;
  align-self: center;
  padding: 10px;
}

.sc-header--team-name {
  align-self: center;
  padding: 10px;
  flex: 1;
  user-select: none;
  cursor: pointer;
  border-radius: 5px;
}

.sc-header--team-name:hover {
  background: #4882ed;
}

.sc-header--close-button {
  width: 40px;
  align-self: center;
  height: 40px;
  margin-right: 10px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
}

.sc-header--close-button:hover {
  background: #4882ed;
}

.sc-header--close-button img {
  width: 100%;
  height: 100%;
  padding: 13px;
  box-sizing: border-box;
}

@media (max-width: 450px) {
  .sc-header {
    border-radius: 0px;
  }
}
</style>
