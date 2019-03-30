import Vue from 'vue'
import Vuex from 'vuex'
import map from './modules/map'
import details from './modules/details'
import settings from './modules/settings'
import activity from './modules/activity'
import calendar from './modules/calendar'
import tempo from './modules/tempo'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    map: map,
    details: details,
    settings: settings,
    activity: activity,
    calendar: calendar,
    tempo: tempo
  },
  strict: debug,
})