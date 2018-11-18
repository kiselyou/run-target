import './style.scss'
import Vue from 'vue'
import template from './template.vue'
import '@vue/Calendar/components/Month'
import '@vue/CalendarRun/components/DayRun'

export default Vue.component('MonthRun', {
  props: {
    month: {
      type: Object,
      required: true
    },
    locale: {
      type: String,
      required: true
    },
    showArrow: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    log: (data) => {
      console.log(data)
    },
    next: function (date) {
      this.$emit('nextMonth', date)
    },
    prev: function (date) {
      this.$emit('prevMonth', date)
    }
  },
  template: template
})