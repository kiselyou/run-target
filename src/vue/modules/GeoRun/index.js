import './style.scss'
import Vue from 'vue'
import Geo from '@lib/geo-location/Geo'
import Signal from '@lib/geo-location/Signal'
import template from './template.html'
import Ajax from '@lib/Ajax'
import '@vue/Tab'
import '@vue/Signal'
import '@vue/Countdown'
import '@module/Timer'
import '@module/Confirm'
import '@module/CalendarRun'
import '@module/Tempo'
import '@module/Spinner'
import '@module/Details'
import '@module/Activity'

import Timer from '@lib/Timer'
import Plugins from '@lib/cordova/Plugins'
import TabItems from '@vue/Tab/api/TabItems'
import TabItem from '@vue/Tab/api/TabItem'

const debug = false
const timer = new Timer()

export default Vue.component('GeoRun', {
  props: {

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
      geo: new Geo(debug),

      /**
       * @type {Signal}
       */
      signal: new Signal(),

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
       * @type {boolean}
       */
      disabled: false,

      /**
       * @type {boolean}
       */
      calendarDisabled: false,

      /**
       * 0 - выкл., 1 - бег, 2 - пауза
       */
      status: 0,

      /**
       * Табы.
       *
       * @type {TabItems}
       */
      tabItems: new TabItems()
        .pushItem(new TabItem('content-activity', 'Активность', true))
        // .pushItem(new TabItem('content-details', 'Подробности').disable(true))
        .pushItem(new TabItem('content-tempo', 'Темп')),
    }
  },
  mounted() {
    this.geo.listen()
    this.signal.listen()
  },
  computed: {
    targetDistance: function () {
      return this.day ? (this.day.getNumberOption('expectDistance') * 1000): 0
    },
    path: function () {
      if (!this.day) {
        return 0
      }
      if (this.day.isNow) {
        return this.geo.getPathLength()
      }
      return (this.day.getNumberOption('resultDistance') * 1000) + this.geo.getPathLength()
    },
    speed: function () {
      return this.geo.avgSpeed
    },
    tempo: function () {
      return timer.setTime(this.geo.getTempo()).toNumberMinutes()
    },
    geoSignalValue: function () {
      return this.signal.value
    },
    geoIsDisabled: function () {
      return this.signal.isGeoDisabled
    },
    dayId: function () {
      return this.day ? this.day.id : null
    },
    time: function () {
      return this.geo.timer.toStringHours()
    },
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
      this.disabled = false
    },

    /**
     * CalendarRun.
     * Метод дня устоновки выбранного дня в календаре.
     *
     * @param day
     */
    selectDay: function (day) {
      this.day = day
      this.disabled = !this.day.isNow
    },

    /**
     * Confirm.
     * Кнопка включить GPS модуль.
     */
    enableGPS() {
      this.showConfirmGPS = false
      Plugins.diagnostic.switchToLocationSettings()
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
    startRun: function () {
      this.status = 1
      this.showCountdown = false
      this.geo.start((error) => {
        this.geoErrorMessage = error.message
      })
      this.calendarDisabled = true
      for (const tabItem of this.tabItems) {
        tabItem.disable(true)
      }
      Plugins.bgMode.overrideBackButton()
      Plugins.bgMode.wakeUp()
      Plugins.bgMode.enable()
    },

    /**
     * Timer.
     * Кнопка старт.
     */
    beforeStarRun: function () {
      Plugins.diagnostic.isGpsLocationEnabled(
        (enabled) => {
          if (!enabled) {
            this.showConfirmGPS = true
          } else {
            this.showCountdown = true
          }
        },
        (error) => {
          if (this.signal.isGeoDisabled) {
            this.showConfirmGPS = true
          } else {
            this.showCountdown = true
          }
        }
      )
    },

    /**
     * Timer.
     * Кнопка стоп.
     */
    stopRun: function () {
      this.status = 2
      this.geo.stop()
    },

    /**
     * Timer.
     * Кнопка стоп.
     */
    nextRun: function () {
      this.status = 1

      this.geo.start((error) => {
        this.geoErrorMessage = error.message
      })
    },

    /**
     * Timer.
     * Кнопка закончить.
     */
    endRun: function () {
      this.status = 0
      this.geo.stop()
      this.calendarDisabled = false
      for (const tabItem of this.tabItems) {
        tabItem.disable(false)
      }

      const pathLength = this.geo.getPathLength() / 1000
      const oldResultDistance = this.day.getNumberOption('resultDistance')
      this.day.addOption('resultDistance', oldResultDistance + pathLength)
      this.day.pushOption('piecesDistance', pathLength)

      Ajax.post(`run/save/activity/${this.day.id}`, { day: this.day, geo: this.geo.serialize() })
        .catch(console.error)

      this.geo.clear()
      Plugins.bgMode.disable()
      Plugins.bgMode.unlock()
    },
  },
  template: template
})