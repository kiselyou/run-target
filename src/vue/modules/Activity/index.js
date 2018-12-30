import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'
import '@vue/RunProcess'
import '@module/Timer'

export default Vue.component('Activity', {
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