import Vue from 'vue'
import App from './App.vue'
import Chat from 'plugin'

Vue.use(Chat, {})

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App)
})
