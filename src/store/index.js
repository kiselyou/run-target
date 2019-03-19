import Vue from 'vue'
import Vuex from 'vuex'
import map from './modules/map'
import settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    map: map,
    settings: settings
  },
  strict: debug,
})