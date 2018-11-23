import './style.scss'
import Vue from 'vue'
import template from './template.vue'

import '@vue/GeoRun'
import '@vue/Calendar'
import '@vue/CalendarRun'

export default Vue.component('Target', {
  data: function () {
    return {
      startDate: '2018-11-11',
    }
  },
  template: template
})