import './style.scss'
import Vue from 'vue'
import template from './template.html'

export default Vue.component('VueIcon', {
  props: {
    name: {
      type: String,
      require: true
    },
    size: {
      type: Number,
      default: 12
    },
    color: {
      type: String,
    }
  },
  computed: {
    htmlStyle() {
      return {
        fill: this.color
      }
    }
  },
  template: template
})