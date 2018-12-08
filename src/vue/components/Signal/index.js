import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('Signal', {
  props: {
    value: {
      type: Number,
      default: 100
    },
    size: {
      type: Number,
      default: 16
    },
    label: {
      type: String,
      default: 'GPS'
    },
  },
  methods: {
    barClass(index) {
      return {
        'signal_bar__active': (this.value / 20) >= index
      }
    },
  },
  template: template
})