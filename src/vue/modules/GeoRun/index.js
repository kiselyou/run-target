import './style.scss'
import Vue from 'vue'
import Geo from './lib/Geo'
import EmulatorGeo from './lib/EmulatorGeo'
import template from './template.html'

import '@vue/Speed'
import '@vue/RunProcess'
import '@module/Timer'
import '@module/CalendarRun'

const debug = false

export default Vue.component('GeoRun', {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data: function () {
    return {
      geoErrorMessage: null,
      targetId: 32,
      geo: debug ? new EmulatorGeo() : new Geo(),
      day: null, // Выбранные день календаря. (содержит информацию о текущей цели)
    }
  },
  methods: {
    changeDay: function (day) {
      this.day = day
    },
    finishDistance: function () {
      let distance
      if (this.day) {
        distance = this.day.getOption('distance')
      }
      return (distance || 0) * 1000
    },
    path: function () {
      return this.geo.pathLength
    },
    speed: function () {
      return this.geo.speed
    },
    tempo: function () {
      return this.geo.tempo
    },
    start: function (actionStartTimer) {
      this.geo.start(actionStartTimer, (error) => {
        this.geoErrorMessage = error.message
        this.geo.stop()
      })
    },
    stop: function (actionStopTimer) {
      actionStopTimer()
      this.geo.stop()
    },
    end: function (actionEndTimer) {
      actionEndTimer()
      this.geo.end()
    },
  },
  template: template
})