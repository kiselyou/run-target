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
import Ajax from '@lib/Ajax'

export default Vue.component('Details', {
  data: function () {
    return {
      /**
       * @type {boolean}
       */
      loading: true,
      /**
       * @type {Object|?}
       */
      details: null
    }
  },
  mounted() {
    this.loadDetails()
  },
  computed: {
    totalPath: function () {
      return this.details ? this.normalizedDistance(this.details['totalDistance']) : 0
    },
    totalMonthPath: function () {
      return this.details ? this.normalizedDistance(this.details['totalMonthDistance']) : 0
    },
    totalWeekPath: function () {
      return this.details ? this.normalizedDistance(this.details['totalWeekDistance']) : 0
    },
    isDisabledCreateTarget: function () {
      return false
    }
  },
  methods: {
    normalizedDistance(distance) {
      return (distance / 1000).toFixed(2)
    },
    /**
     *
     * @param {Date|?} [date]
     */
    loadDetails(date) {
      this.loading = true
      const timestamp = date ? date.getTime() : 0
      Ajax.post(`details/view/${timestamp}`)
        .then((details) => {
          this.details = details
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    createTarget() {

    },
    activeDay() {
      console.log('activeDay')
    },
    selectDay() {
      console.log('selectDay')
    }
  },
  template: template
})