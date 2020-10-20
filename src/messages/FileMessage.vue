<template>
  <div class="sc-message--file" :style="messageColors" :id="data.file.id">
    <div class="sc-message--file-icon" v-if="data.file.mime == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'">
      <ApplicationWord />
    </div>
    <div class="sc-message--file-icon" v-else-if="data.file.mime == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'">
      <ApplicationExcel />
    </div>
    <div class="sc-message--file-icon" v-else-if="data.file.mime == 'application/vnd.openxmlformats-officedocument.presentationml.presentation'">
      <ApplicationPowerPoint />
    </div>
    <div class="sc-message--file-icon" v-else-if="data.file.mime == 'application/zip'">
      <ApplicationZip />
    </div>
    <div class="sc-message--file-icon" v-else-if="data.file.mime == 'image/jpeg'">
      <ApplicationJpg />
    </div>
    <div class="sc-message--file-icon" v-else-if="data.file.mime == 'image/svg+xml'">
      <ApplicationSvg />
    </div>
    <div class="sc-message--file-icon" v-else-if="data.file.mime == 'text/csv'">
      <ApplicationCsv />
    </div>
    <div class="sc-message--file-icon" v-else-if="data.file.mime == 'application/pdf'">
      <ApplicationPdf />
    </div>
    <div class="sc-message--file-icon" v-else-if="data.file.mime == 'image/png'">
      <ApplicationPng />
    </div>
    <div class="sc-message--file-icon" v-else="">
      <ApplicationDefault />
    </div>
    <div class="sc-message--file-content">
      <div class="sc-message--file-name" :style="messageColors">
        {{truncateFilename(data.file.name, 20) || ''}}
      </div>
      <DownloadIcon />
      <div class="sc-message--file-size" :style="messageColors">
        {{humanReadableFileSize(data.file.size) || ''}}
      </div>
    </div>
  </div>
</template>

<script>

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
    humanReadableFileSize(aSize) {
      const prettyBytes = require('pretty-bytes');
      return prettyBytes(aSize);
    },
    truncateFilename(filename, maxLength) {
      if(filename.length > maxLength) {
        const smartTruncate = require('smart-truncate');
        return smartTruncate(string, maxLength, {position: 10});
      } else {
        return filename
      }
    }
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

<style lang="scss">
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

.sc-message--content.sent {
  .sc-message--file-icon svg {
    fill: #ffffff;
  }

  .sc-message--file-download-icon {
    fill: #ffffff;
    path {
      stroke: #ffffff;
    }
  }
}

</style>
