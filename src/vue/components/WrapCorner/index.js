import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('WrapCorner', {
  props: {
    bottom: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    htmlClass: function () {
      return {
        'wrap-corner_left-top': this.right === false && this.bottom === false,
        'wrap-corner_left-bottom': this.right === false && this.bottom === true,
        'wrap-corner_right-top': this.right === true && this.bottom === false,
        'wrap-corner_right-bottom': this.right === true && this.bottom === true
      }
    }
  },
  template: template
})