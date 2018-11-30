import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('PulseLoader', {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#252525'
    },
    size: {
      type: String,
      default: '15px'
    },
    margin: {
      type: String,
      default: '10px'
    },
    radius: {
      type: String,
      default: '100%'
    },
    htmlClass: {
      type: [String, Object],
    }
  },
  data () {
    return {
      spinnerStyle: {
        backgroundColor: this.color,
        width: this.size,
        height: this.size,
        margin: this.margin,
        borderRadius: this.radius,
        display: 'inline-block',
        animationName: 'v-pulseStretchDelay',
        animationDuration: '0.50s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'cubic-bezier(.2,.68,.18,1.08)',
        animationFillMode: 'both'
      },
      spinnerDelay1: {
        animationDelay: '0.12s'
      },
      spinnerDelay2: {
        animationDelay: '0.24s'
      },
      spinnerDelay3: {
        animationDelay: '0.36s'
      }
    }
  },
  template: template
})