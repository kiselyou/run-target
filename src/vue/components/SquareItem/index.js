import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@vue/VueIcon'

export default Vue.component('SquareItem', {
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

      }
    }
  },
  template: template
})