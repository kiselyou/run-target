import './style.scss'
import Vue from 'vue'
import template from './template.vue'

export default Vue.component('Speed', {
  props: {
    tempoLabel: {
      type: String,
      default: 'темп (мин/км)'
    },
    tempoValue: {
      type: String
    },
    speedLabel: {
      type: String,
      default: 'скорость (км/ч)'
    },
    speedValue: {
      type: String
    },
    distanceLabel: {
      type: String,
      default: 'дистанция (км)'
    },
    distanceValue: {
      type: String
    },
  },
  data: function () {
    return {

    }
  },
  methods: {
    log: (data) => {
      console.log(data)
    },
  },
  template: template
})