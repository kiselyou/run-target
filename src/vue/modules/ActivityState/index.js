import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'
import '@vue/RunProcess'
import '@vue/Signal'
import '@module/Timer'

import Signal from '@lib/location/Signal'

export default Vue.component('ActivityState', {
  props: {
    tempoLabel: {
      type: String,
      default: 'темп (мин/км)'
    },
    tempo: {
      type: Number
    },
    speedLabel: {
      type: String,
      default: 'скорость (км/ч)'
    },
    speed: {
      type: Number
    },
    pathLabel: {
      type: String,
      default: 'расстояние (км)'
    },
    path: {
      type: Number
    },
    target: {
      type: Number
    },
    time: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    pause: {
      type: Boolean,
      default: false
    },
    showCorner: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    debug: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      signal: new Signal(this.debug)
    }
  },
  beforeMount: function () {
    this.signal.listen()
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
    },
    pathPiece: function () {
      return this.path % 1000
    },
    signalValue: function () {
      return this.signal.value
    },
    htmlClassControls: function () {
      return {
        'activity-state_controls__corner': this.showCorner
      }
    }
  },
  methods: {
    processLabel: function (tagret, value) {
      if (tagret <= 0) {
        return null
      }
      const remainder = tagret - value
      if (remainder < 0) {
        return `Цель достигнута.`
      }
      return `Осталось ${Number(remainder / 1000).toFixed(3)} км.`
    },
  },
  template: template
})