<template>
    <div class="sc-message--file-icon">
<!--      <a :href="data.file.url ? data.file.url : '#'" target="_blank">-->
      <img :src="data.file.url" class="sc-image" @click="isModalOpened=true" />
<!--      </a>-->
        <div v-show="isModalOpened"  class="sc-modal">
            <!-- Modal content -->
            <div class="sc-modal-content">

                <span class="sc-close" @click="isModalOpened=false">&times;</span>
                <img :src="data.file.url" class="sc-image" />
                {{ data.file.name }}
            </div>

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
  },
    data() {
        return {
            isModalOpened: false
        }
    },
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
  border-radius: 6px;
}

.sc-modal {
    display: block; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.sc-modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.sc-close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.sc-close:hover,
.sc-close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
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
</style>
