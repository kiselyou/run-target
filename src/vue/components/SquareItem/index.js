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
    width: {
      type: String,
    }
  },
  computed: {
    htmlStyle: function () {
      return {
        'maxWidth': this.width
      }
    }
  },
  methods: {
    click: function (e) {
      this.$emit('click', e)
    }
  },
  template: template
})