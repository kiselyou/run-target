import './style.scss'
import Vue from 'vue'
import template from './template.vue'
import Point from './lib/Point'

export default Vue.component('GeoRun', {
  props: {
    maximumAge: {
      type: Number,
      default: 3000,
    },
    timeout: {
      type: Number,
      default: 30000,
    },
  },
  data: function () {
    return {
      points: [],
      distance: 0,
      speed: 0,
      watchID: null,
      errorCode: null,
      errorMessage: null,
      debug: []
    }
  },
  methods: {
    onSuccess: function (position) {
      this.debug.push('onSuccess')
      const prevPoint = this.points.length > 0 ? this.points[this.points.length - 1] : null
      const point = new Point(position, prevPoint)
      this.distance += point.distance
      this.points.push(point)

      this.speed = position.coords.speed
    },
    onError: function (error) {
      this.debug.push('onError')
      console.log('onError', error)
      this.errorCode = error.code
      this.errorMessage = error.message
    },
    start: function () {
      this.debug.push('start')
      const options = {
        enableHighAccuracy: true,
        maximumAge: this.maximumAge,
        timeout: this.timeout
      }
      this.watchID = navigator.geolocation.watchPosition(this.onSuccess, this.onError, options)
    },
    stop: function () {
      this.debug.push('stop')
      console.log('stop')
      navigator.geolocation.clearWatch(this.watchID)
      this.watchID = null
    },
    end: function () {
      this.stop()
      // save
    },
  },
  template: template
})