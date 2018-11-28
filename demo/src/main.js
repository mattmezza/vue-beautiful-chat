import Vue from 'vue'
import App from './App.vue'
import Chat from '../../dist/vue-beautiful-chat.umd.js'
import vmodal from 'vue-js-modal'

// Comment if the css extraction is set to false for vue-beautiful-chat
import '../../dist/vue-beautiful-chat.css'

Vue.use(vmodal , { dialog: true })
Vue.use(Chat, {})

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App)
})
