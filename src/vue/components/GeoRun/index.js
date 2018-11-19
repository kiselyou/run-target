import './style.scss'
import Vue from 'vue'
import template from './template.vue'
import Geo from './lib/Geo'

export default Vue.component('GeoRun', {
  props: {

  },
  data: function () {
    return {
      geo: new Geo(),
    }
  },
  methods: {
    isEnabled: function () {
      return this.geo.isEnabled()
    },
    pathLength: function () {
      return this.geo.pathLength
    },
    speed: function () {
      return this.geo.speed
    },
    start: function () {
      this.geo.start()
    },
    stop: function () {
      this.geo.stop()
    },
    end: function () {
      this.geo.clear()

    },
  },
  template: template
})