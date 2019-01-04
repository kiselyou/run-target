import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@module/Spinner'
import '@module/ActivityState'
import '@module/ActivityControls'

import Geo from '@lib/location/Geo'
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
       * @type {Geo}
       */
      geo: new Geo(this.debug),
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
    this.geo.listen()
    this.geo.addEventListener('change-distance', (distance) => {
      if (distance.number > 0) {
        Plugins.vibration.call([200, 100, 200, 100, 200, 100, 200, 100, 200])
      }
    })
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
      this.geo.start()
    },
    stopRun: function () {
      this.geo.stop()
      this.pause = true
    },
    nextRun: function () {
      this.geo.start()
      this.pause = false
    },
    endRun: function () {
      this.geo.stop()
      this.pause = false
      this.loading = true
      Ajax.post(`activity/save`, { activity: this.geo.serialize() })
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
      this.geo.clear()
    }
  },
  template: template
})