import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'
import '@vue/RunProcess'
import '@vue/Signal'
import '@vue/Layout'
import '@vue/WrapCorner'
import '@module/Timer'

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
    hrm: {
      type: [String, Number]
    },
    hrmLabel: {
      type: String,
      default: 'пульс'
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
    },
    signalValue: {
      type: Number,
      default: 0
    }
  },
  computed: {
    speedValue: function () {
      return (this.speed).toFixed(2)
    },
    hrmValue: function () {
      return this.hrm
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