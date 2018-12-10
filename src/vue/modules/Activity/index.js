import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'
import '@vue/RunProcess'

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
      if (remainder < (tagret / 8)) {
        return `Вижу цель.`
      }
      if (remainder < (tagret / 4)) {
        return `Осталось совсем немного.`
      }
      if (remainder < (tagret / 2)) {
        return `Осталось меньше половины.`
      }
      return `Осталось ${Number(remainder / 1000).toFixed(3)} км.`
    }
  },
  template: template
})