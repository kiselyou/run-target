import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('RingLoader', {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#5dc596'
    },
    size: {
      type: String,
      default: '60px'
    },
    margin: {
      type: String,
      default: '2px'
    },
    radius: {
      type: String,
      default: '100%'
    },
    htmlClass: {
      type: [String, Object],
    }
  },
  computed: {
    spinnerStyle () {
      return {
        height: this.size,
        width: this.size,
        border: parseFloat(this.size) / 10 + 'px solid' + this.color,
        opacity: 0.4,
        borderRadius: this.radius
      }
    },
    spinnerBasicStyle () {
      return {
        height: this.size,
        width: this.size,
        position: 'relative'
      }
    }
  },
  template: template
})