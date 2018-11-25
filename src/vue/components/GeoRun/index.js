import './style.scss'
import Vue from 'vue'
import Geo from './lib/Geo'
import EmulatorGeo from './lib/EmulatorGeo'
import template from './template.vue'

import '@vue/RunProcess'
import '@vue/Timer'
import '@vue/Speed'

export default Vue.component('GeoRun', {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data: function () {
    return {
      startDate: '2018-11-11',
      geo: new EmulatorGeo(), // Дата с которой начинается цель тренировки в календаре
      day: null,
    }
  },
  methods: {
    setCurrentDay: function (day) {
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
    start: function () {
      this.geo.start()
    },
    stop: function () {
      this.geo.stop()
    },
    end: function () {
      this.geo.end()

    },
  },
  template: template
})