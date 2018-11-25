import './style.scss'
import Vue from 'vue'
import template from './template.vue'

export default Vue.component('Speed', {
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
    distanceLabel: {
      type: String,
      default: 'расстояние (км)'
    },
    distance: {
      type: Number
    },
  },
  data: function () {
    return {}
  },
  methods: {
    speedValue: function () {
      return (this.speed).toFixed(2)
    },
    tempoValue: function () {
      return (this.tempo).toFixed(2)
    },
    distanceValue: function () {
      return (this.distance / 1000).toFixed(3)
    }
  },
  template: template
})