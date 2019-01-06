import './style.scss'
import Vue from 'vue'
import template from './template.html'
import '@vue/DotLoader'
import '@vue/PulseLoader'
import '@vue/RingLoader'
import '@vue/BounceLoader'

export default Vue.component('Spinner', {
  props: {
    name: {
      type: String,
      default: 'PulseLoader'
    },
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: undefined
    },
    margin: {
      type: String,
      default: undefined
    },
    radius: {
      type: String,
      default: undefined
    },
    wrap: {
      type: Boolean,
      default: true
    },
  },
  template: template
})