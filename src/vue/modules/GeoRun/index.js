import './style.scss'
import Vue from 'vue'
import Geo from './lib/Geo'
import EmulatorGeo from './lib/EmulatorGeo'
import template from './template.html'
import Ajax from '@lib/Ajax'
import '@vue/Speed'
import '@vue/Signal'
import '@vue/RunProcess'
import '@vue/Countdown'
import '@module/Timer'
import '@module/CalendarRun'

const debug = true

export default Vue.component('GeoRun', {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data: function () {
    return {
      /**
       * @type {string|?}
       */
      geoErrorMessage: null,

      /**
       * @type {number}
       */
      targetId: 32,

      /**
       * @type {Geo}
       */
      geo: debug ? new EmulatorGeo() : new Geo(),

      /**
       * @type {DayRun|?}
       */
      day: null, // Выбранный день календаря. (содержит информацию о текущей цели)

      /**
       * @type {number}
       */
      geoSignalLevel: 0,

      enabledCountdown: false
    }
  },
  mounted() {
    this.geo.listenSignalLevel((signal) => {
      this.geoSignalLevel = signal.value
    })
  },
  methods: {
    changeDay: function (day) {
      this.day = day
    },
    finishDistance: function () {
      const distance = this.day ? this.day.getOption('expectDistance') : 0
      return (distance || 0) * 1000
    },
    path: function () {
      return this.geo.getPathLengthFull()
    },
    speed: function () {
      return this.geo.getAvgSpeed()
    },
    tempo: function () {
      return this.geo.getTempo()
    },

    startRun: function () {
      this.enabledCountdown = false
    },

    /**
     *
     * @param {Function} startTimer - Функция которая запускает таймер. (modules/Timer)
     */
    start: function (startTimer) {
      this.enabledCountdown = true
      // this.geo.start(startTimer, (error) => {
      //   this.geoErrorMessage = error.message
      //   this.geo.stop()
      // })
    },

    /**
     *
     * @param {Function} stopTimer - Функция которая запускает таймер. (modules/Timer)
     */
    stop: function (stopTimer) {
      stopTimer()
      this.geo.stop()
    },

    /**
     *
     * @param {Function} endTimer - Функция которая запускает таймер. (modules/Timer)
     */
    end: function (endTimer) {
      endTimer()
      this.geo.stop()

      const pathLength = this.geo.getPathLengthFull() / 1000
      const oldResultDistance = this.day.getNumberOption('resultDistance')
      this.day.addOption('resultDistance', oldResultDistance + pathLength)
      this.day.pushOption('piecesDistance', pathLength)

      Ajax.post(`run/update/day/${this.day.id}`, { day: this.day })
        .catch(console.error)

      Ajax.post(`run/update/points/${this.targetId}`, this.geo.serialize())
        .catch(console.error)

      this.geo.clear()
    },
  },
  template: template
})