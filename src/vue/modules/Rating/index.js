import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@vue/VueIcon'

export default Vue.component('Rating', {
  props: {
    icon: {
      type: String,
      default: 'star'
    },
    label: {
      type: String,
      default: null
    },
    activeColor: {
      type: String,
      default: '#EE9900'
    },
    defaultColor: {
      type: String,
      default: '#999999'
    },
    size: {
      type: Number,
      default: 15
    },
    percent: {
      type: Number,
      default: 0
    },
  },
  methods: {
    colorItem: function (number) {
      if (this.percent < (number * 20)) {
        return this.activeColor
      }
      return this.defaultColor
    }
  },
  template: template
})