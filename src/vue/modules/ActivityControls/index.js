import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '@vue/Button'
import '@vue/Countdown'
import '@module/Confirm'
import Plugins from '@lib/cordova/Plugins'

export default Vue.component('ActivityControls', {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data: function () {
    return {
      /**
       * 0 - выкл., 1 - бег, 2 - пауза
       */
      status: 0,
      /**
       * TRUE - Запустить обратный отсчет.
       *
       * @type {boolean}
       */
      showCountdown: false,
      /**
       * @type {boolean}
       */
      confirmGPS: false,
      /**
       * @type {boolean}
       */
      showConfirmGPS: false
    }
  },
  computed: {
    speedValue: function () {
      return (this.speed).toFixed(2)
    },
    tempoValue: function () {
      return (this.tempo).toFixed(2)
    },
    pathValue: function () {
      return (this.path / 1000).toFixed(3)
    }
  },
  methods: {
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
          this.showCountdown = true
        }
      )
    },

    /**
     * Countdown.
     * Срабатывает после того как закончится обратный отсчет.
     */
    startRun: function () {
      this.status = 1
      this.showCountdown = false
      Plugins.bgMode.overrideBackButton()
      Plugins.bgMode.wakeUp()
      Plugins.bgMode.enable()
      this.$emit('startRun')
    },

    /**
     * Timer.
     * Кнопка стоп.
     */
    stopRun: function () {
      this.status = 2
      this.$emit('stopRun')
    },

    /**
     * Timer.
     * Кнопка стоп.
     */
    nextRun: function () {
      this.status = 1
      this.$emit('nextRun')
    },

    /**
     * Timer.
     * Кнопка закончить.
     */
    endRun: function () {
      this.status = 0
      this.$emit('endRun')
      Plugins.bgMode.disable()
      Plugins.bgMode.unlock()
    },

    /**
     * Confirm.
     * Кнопка включить GPS модуль.
     */
    enableGPS() {
      this.confirmGPS = false
      Plugins.diagnostic.switchToLocationSettings()
    },

    /**
     * Confirm.
     * Кнопка отмена.
     */
    cancelEnableGPS() {
      this.confirmGPS = false
    },
  },
  template: template
})