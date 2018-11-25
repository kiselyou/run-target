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
    finishDistance: {
      type: Number,
      required: true
    },
  },
  data: function () {
    return {
      geo: new EmulatorGeo(),
    }
  },
  methods: {
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