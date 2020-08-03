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
      <svg class="sc-message--file-download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="30px" height="30px" @click="$emit('download')">
        <path fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="2" d="M31 28L25 34 19 28"/>
        <path fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="2" d="M31 28L25 34 19 28"/>
        <path fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M25 20L25 34"/>
        <path fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M43,24.3c0-0.1,0-0.2,0-0.3c0-5.5-4.5-10-10-10c-1.2,0-2.3,0.2-3.4,0.6C27.7,11.3,24.1,9,20,9C13.9,9,9,13.9,9,20c0,0.1,0,0.1,0,0.2c-4.6,0.9-8,5-8,9.8c0,5.5,4.5,10,10,10c5.2,0,26.3,0,30,0c4.4,0,8-3.6,8-8C49,28.3,46.4,25.1,43,24.3z"/>
      </svg>
      <div class="sc-message--file-size" :style="messageColors">
        {{humanReadableFileSize(data.file.size) || ''}}
      </div>
    </div>
    <div class="sc-message--file-text" :style="messageColors">{{data.text}}<p v-if="data.meta" class='sc-message--meta' :style="messageColors">{{data.meta}}</p></div>
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
      aSize = Math.abs(parseInt(aSize, 10));
      var def = [[1, 'bytes'], [1024, 'kb'], [1024*1024, 'Mb'], [1024*1024*1024, 'Gb']];
      for(var i=0; i<def.length; i++){
        if(aSize<def[i][0]) return (aSize/def[i-1][0]).toFixed(2)+' '+def[i-1][1];
      }
    },
    truncateFilename(filename, maxLength) {
      if(filename.length > maxLength) {
        return filename.substring(0, maxLength) + '...'
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
  }
}
</script>

<style lang="scss">
.sc-message--file {
  border-radius: 6px;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  -webkit-font-smoothing: subpixel-antialiased
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
  -webkit-font-smoothing: subpixel-antialiased
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
