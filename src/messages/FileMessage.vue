<template>
  <div class="sc-message--file" :style="messageColors" :id="data.file.id">
    <div class="sc-message--file-icon" :style="messageColors">
      <component :is="`Application${mimeToIcon[data.file.mime] || 'Default'}`" />
    </div>
    <div class="sc-message--file-content">
      <div class="sc-message--file-name" :style="messageColors">
        {{data.file && smartTruncate(data.file.name || '', 20)}}
      </div>
      <div class="sc-message--file-download-icon" :style="messageColors" @click="$emit('download')">
        <DownloadIcon />
      </div>
      <div class="sc-message--file-size" :style="messageColors">
        {{data.file && prettyBytes(data.file.size || 0)}}
      </div>
    </div>
    <div class="sc-message--file-meta" :style="messageColors">
      <p v-if="data.meta" class='sc-message--meta' :style="messageColors">{{data.meta}}</p>
    </div>
  </div>
</template>

<script>
import prettyBytes from 'pretty-bytes'
import smartTruncate from 'smart-truncate'
import ApplicationWord from '../assets/mimes/application_msword.svg.vue'
import ApplicationPdf from '../assets/mimes/application_pdf.svg.vue'
import ApplicationPng from '../assets/mimes/image_png.svg.vue'
import ApplicationExcel from '../assets/mimes/application_vnd.ms-excel.svg.vue'
import ApplicationPowerPoint from '../assets/mimes/application_vnd.ms-powerpoint.svg.vue'
import ApplicationZip from '../assets/mimes/application_zip.svg.vue'
import ApplicationDefault from '../assets/mimes/default_file.svg.vue'
import ApplicationJpg from '../assets/mimes/image_jpeg.svg.vue'
import ApplicationSvg from '../assets/mimes/image_svg.svg.vue'
import ApplicationCsv from '../assets/mimes/text_csv.svg.vue'
import DownloadIcon from '../assets/download-icon.svg.vue'
export default {
  data() {
    return {
      mimeToIcon: {
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PowerPoint',
        'application/zip': 'Zip',
        'image/jpeg': 'Jpg',
        'image/svg+xml': 'Svg',
        'text/csv': 'Csv',
        'application/pdf': 'Pdf',
        'image/png':'Png',
      }
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    messageColors: {
      type: Object,
      required: true
    },
  },
  methods:{
    prettyBytes,
    smartTruncate(str, len) {
      return smartTruncate(str, len, {position: 10})
    },
  },
  components:{
    ApplicationWord,
    ApplicationPdf,
    ApplicationPng,
    ApplicationExcel,
    ApplicationPowerPoint,
    ApplicationZip,
    ApplicationDefault,
    ApplicationJpg,
    ApplicationSvg,
    ApplicationCsv,
    DownloadIcon
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
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-message--content .sc-message--file {
  word-wrap: break-word;
  padding: 5px;
  width: 223px;
}

.sc-message--file-content {
  font-size: small;
  float: right;

  .sc-message--file-download-icon {
    float: right;
    cursor: pointer;
  }
}

.sc-message--file-text {
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  -webkit-font-smoothing: subpixel-antialiased;
}

.sc-message--file-name {
  color: white;
  margin-top: 7px;
  text-align: left;
  width: 148px;
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

.sc-message--file-icon {
  float: left;
}

.sc-message--file-icon svg {
  fill: #000000;
  height: 60px;
  width: 60px;
}

.sc-message--file-download-icon svg {
  fill: #000000;
  stroke: #000000;
}

.sc-message--content.sent svg {
  fill: #ffffff;
  stroke: #ffffff;
}
</style>
