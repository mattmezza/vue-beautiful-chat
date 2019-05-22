<template>
  <div>
  <div class='sc-message--file' :style="messageColors">
    <div class='sc-message--file-icon' v-if="data.file && data.file.url">
      <img :src="data.file.url" class="sc-image" v-viewer v-if="data.file.type.match('image/')">

      <audio controls v-if="data.file.type.match('audio/')">
            <source :src="data.file.url" :type="data.file.type">
      </audio>

      <video width="400" height="200" controls v-if="data.file.type.match('video/')">
            <source :src="data.file.url" :type="data.file.type">
      </video>

        <object width="400" height="200" :data="data.file.url" v-if="data.file.type.match('application/') || data.file.type.match('text/')" :type="data.file.type">
          alt : <a :href="data.file.url"></a>
        </object>


    </div>
    <div class='sc-message--file-name' :style="messageColors" v-if="data.file && data.file.url">
      <a :href="data.file.url ? data.file.url : '#'" target='_blank'>{{data.file.name || ''}}</a>
    </div>

    <div class="sc-message--emoji" v-if="data.emoji">{{data.emoji}}</div>
    
    <div class="sc-message--file-text" :style="messageColors" v-if="!data.emoji && data.text">{{data.text}}<p v-if="data.meta" class='sc-message--meta' :style="messageColors">{{data.meta}}</p></div>
  </div>

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
.sc-message--file {
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  /* white-space: pre-wrap; */
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--content.sent .sc-message--file {
  word-wrap: break-word;
}

.sc-message--file-icon {
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

.sc-message--file-text {
  padding: 17px 20px;
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased
}

.sc-message--file-name {
  color: white;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 0;
  font-size: x-small;
  text-align: center;
}

.sc-message--file-name a {
  text-decoration: none;
  color: #ece7e7;
}

.sc-message--file-name a:hover {
  color: white;
}

.sc-message--content.sent .sc-message--file-text {
  color: white;
  background-color: #4e8cff;
  word-wrap: break-word;
}

.sc-message--content.received .sc-message--file {
  color: #263238;
  background-color: #f4f7f9;
  margin-right: 40px;
}

.sc-message--content.received .sc-message--file-name {
  color: #000;
}

.sc-message--content.received .sc-message--file a {
  color: rgba(43, 40, 40, 0.7);
}

.sc-message--content.received .sc-message--file a:hover {
  color: #0c0c0c;
}

.sc-message--emoji {
  font-size: 40px;
}

audio {
    height: 40px !important;
}
</style>
