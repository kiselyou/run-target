import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@vue/Tooltip'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'
import '@vue/Layout'
import '@vue/Button'
import '@vue/WrapCorner'
import '@module/Spinner'
import '@module/CalendarRun'

export default Vue.component('Target', {
  data: function () {
    return {
      /**
       * @type {boolean}
       */
      loading: true,

    }
  },
  mounted() {
    this.loading = false
  },
  computed: {

  },
  methods: {
    createTarget: function () {

    },
    activeDay: function () {

    },
    selectDay: function () {

    }
  },
  template: template
})