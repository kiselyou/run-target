import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('WaveLoader', {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  template: template
})