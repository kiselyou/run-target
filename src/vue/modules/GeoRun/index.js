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
import '@module/Confirm'
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
       * Выбранный или активный день календаря. (содержит информацию о текущей цели)
       *
       * @type {DayRun|?}
       */
      day: null,

      /**
       * TRUE - Запустить обратный отсчет.
       *
       * @type {boolean}
       */
      showCountdown: false,

      /**
       * TRUE - показать предложение, включить GPS модуль.
       *
       * @type {boolean}
       */
      showConfirmGPS: false,

      /**
       * @type {Function}
       */
      beforeStartGeo: null
    }
  },
  mounted() {
    this.geo.signal.listen()
  },
  computed: {
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
    geoSignalValue: function () {
      return this.geo.signal.value
    },
    geoIsDisabled: function () {
      return this.geo.signal.isGeoDisabled
    }
  },
  methods: {
    /**
     * CalendarRun.
     * Метод дня устоновки текущего дня в календаре.
     *
     * @param day
     */
    activeDay: function (day) {
      this.day = day
    },

    /**
     * CalendarRun.
     * Метод дня устоновки выбранного дня в календаре.
     *
     * @param day
     */
    selectDay: function (day) {
      this.day = day
    },

    /**
     * Confirm.
     * Кнопка включить GPS модуль.
     */
    enableGPS() {
      this.showConfirmGPS = false
      // TODO: включить модуль GPS
      this.showCountdown = true // TODO: временно
    },

    /**
     * Confirm.
     * Кнопка отмена.
     */
    cancelEnableGPS() {
      this.showConfirmGPS = false
    },

    /**
     * Countdown.
     * Срабатывает после того как закончится обратный отсчет.
     */
    start: function () {
      this.showCountdown = false
      if (this.beforeStartGeo) {
        this.beforeStartGeo()
      }
      this.geo.start((error) => {
        this.geoErrorMessage = error.message
      })
    },

    /**
     * Timer.
     * Кнопка старт.
     *
     * @param {Function} startTimer - Функция которая запускает таймер. (modules/Timer)
     */
    beforeStar: function (startTimer) {
      this.beforeStartGeo = startTimer
      if (this.geo.signal.isGeoDisabled) {
        this.showConfirmGPS = true
      } else {
        this.showCountdown = true
      }
    },

    /**
     * Timer.
     * Кнопка стоп.
     *
     * @param {Function} stopTimer - Функция которая запускает таймер. (modules/Timer)
     */
    stop: function (stopTimer) {
      stopTimer()
      this.geo.stop()
    },

    /**
     * Timer.
     * Кнопка стоп.
     *
     * @param {Function} stopTimer - Функция которая запускает таймер. (modules/Timer)
     */
    next: function (stopTimer) {
      stopTimer()
      this.geo.start((error) => {
        this.geoErrorMessage = error.message
      })
    },

    /**
     * Timer.
     * Кнопка закончить.
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