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
      type: [Number, String],
    },
    color: {
      type: String,
    }
  },
  computed: {
    htmlStyle() {
      return {
        fill: this.color,
        width: this.size,
        height: this.size
      }
    }
  },
  template: template
})