import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@vue/VueIcon'

export default Vue.component('SquareItem', {
  props: {
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
  },
  methods: {
    click: function (e) {
      this.$emit('click', e)
    }
  },
  template: template
})