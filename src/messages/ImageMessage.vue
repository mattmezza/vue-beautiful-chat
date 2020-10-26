<template>
  <div class="sc-message--image" :style="messageColors">
    <div class="sc-message--image-icon">
      <img :src="data.file.url" class="sc-image">
    </div>
    <div class="sc-message--image-name" :style="messageColors">
      <a :href="data.file.url ? data.file.url : '#'" target='_blank'>{{data.file.name || ''}}</a>
    </div>
    <div class="sc-message--image-text" :style="messageColors">{{data.text}}<p v-if="data.meta" class="sc-message--meta" :style="messageColors">{{data.meta}}</p></div>
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
.sc-message--image {
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--content.sent .sc-message--image {
  word-wrap: break-word;
}

.sc-message--image-icon {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 0px;
}

.sc-image {
  max-width: 100%;
  min-width: 100%;
}

.sc-message--image-text {
  padding: 17px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--image-name {
  color: white;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0;
  font-size: x-small;
  text-align: center;
}

.sc-message--image-name a {
  text-decoration: none;
  color: #ece7e7;
}

.sc-message--image-name a:hover {
  color: white;
}

.sc-message--content.sent .sc-message--image-text {
  color: white;
  background-color: #4e8cff;
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--image {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.sc-message--content.received .sc-message--image-name {
  color: #000;
}

.sc-message--content.received .sc-message--image a {
  color: rgba(43, 40, 40, 0.7);
}

.sc-message--content.received .sc-message--image a:hover {
  color: #0c0c0c;
}
</style>
