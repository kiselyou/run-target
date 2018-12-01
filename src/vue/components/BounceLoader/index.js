import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('BounceLoader', {
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
  data () {
    return {
      spinnerStyle: {
        backgroundColor: this.color,
        height: this.size,
        width: this.size,
        borderRadius: this.radius,
        opacity: 0.6,
        position: 'absolute',
        top: 0,
        left: 0
      }
    }
  },
  computed: {
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