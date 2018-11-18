import './style.scss'
import Vue from 'vue'
import './components/MonthRun'
import Run from './lib/Run'
import template from './template.vue'

export default Vue.component('CalendarRun', {
  props: {
    startDate: {
      type: [String, Date],
      default: function () {
        return new Date()
      }
    },
    locale: {
      type: String,
      default: 'ru'
    },
  },
  data: function () {
    return {
      calendar: new Run().setStartDate(this.startDate).generate(),
      selectedDate: new Date(this.startDate)
    }
  },
  methods: {
    log: function (data) {
      console.log(data)
    },
    month: function () {
      return this.calendar.getMonth(this.selectedDate)
    },
    next: function (month) {
      this.selectedDate = new Date(month.lastDay)
      this.selectedDate.setDate(this.selectedDate.getDate() + 1)
    },
    prev: function (month) {
      this.selectedDate = new Date(month.firstDay)
      this.selectedDate.setDate(this.selectedDate.getDate() - 1)
    }
  },
  template: template
})