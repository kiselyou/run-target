import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@module/Spinner'
import '@module/ActivityState'
import '@module/ActivityControls'

import GeoControls from '@lib/location/GeoControls'
import Timer from '@lib/Timer'
import Ajax from '@lib/Ajax'
import Plugins from '@lib/cordova/Plugins'

const timer = new Timer()

export default Vue.component('Activity', {
  props: {
    debug: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      /**
       * @type {GeoControls}
       */
      geo: new GeoControls(this.debug),
      /**
       * @type {boolean}
       */
      pause: false,
      /**
       * @type {boolean}
       */
      loading: false,
    }
  },
  mounted() {
    this.geo.addEventListener('change-distance', (distance) => {
      if (distance.number > 0) {
        Plugins.vibration.call([2000, 1000, 2000, 1000, 2000, 1000, 2000])
      }
    })
  },
  activated() {
    // Если геолокация выключена то включить ее.
    if (this.geo.isDisabledGeoLocation()) {
      this.geo.enableGeoLocation()
    }
  },
  deactivated() {
    // Если слушатель выключен то выключить и геолокацию.
    if (this.geo.isDisabledGeoListener()) {
      this.geo.disableGeoLocation()
    }
  },
  computed: {
    path: function () {
      return this.geo.getPathLength()
    },
    speed: function () {
      return this.geo.avgSpeed
    },
    tempo: function () {
      return timer.setTime(this.geo.getTempo()).toNumberMinutes()
    },
    targetDistance: function () {
      return 1000
    },
    time: function () {
      return this.geo.timer.toStringHours()
    },
  },
  methods: {
    startRun: function () {
      this.geo.startGeoListener()
    },
    stopRun: function () {
      this.geo.stopGeoListener()
      this.pause = true
    },
    nextRun: function () {
      this.geo.startGeoListener()
      this.pause = false
    },
    endRun: function () {
      this.geo.stopGeoListener()
      this.pause = false
      this.loading = true
      Ajax.post(`activity/save`, { activity: this.geo.serialize() })
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
      this.geo.clearGeoListener()
    }
  },
  template: template
})