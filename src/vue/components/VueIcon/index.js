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
      type: [String, Number]
    },
    color: {
      type: String
    }
  },
  data: function () {
    return {
      path: './icon/sprite.min.svg'
    }
  },
  computed: {
    href() {
      return `${this.path}#${this.name}`

    },
    htmlStyle() {
      return {
        width: this.size,
        height: this.size,
        fill: this.color
      }
    }
  },
  template: template
})