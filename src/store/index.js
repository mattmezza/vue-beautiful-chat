/*
 * Use store pattern instead of Vuex since this is a plugin
 * and instantiated externally
 **/

import Vue from 'vue'

const store = {
  state: Vue.observable({
    editMessage: null
  }),

  setState(key, val) {
    Vue.set(this.state, key, val)
  }
}

function mapState(keys) {
  const map = {}
  keys.forEach((key) => {
    map[key] = function () {
      return store.state[key]
    }
  })
  return map
}

export default store
export {mapState}
