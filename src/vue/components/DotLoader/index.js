import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('DotLoader', {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#EE9900'
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
        backgroundColor: this.color,
        height: parseFloat(this.size) / 2 + 'px',
        width: parseFloat(this.size) / 2 + 'px',
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