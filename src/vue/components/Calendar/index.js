import './style.scss'
import Vue from 'vue'
import './components/Month'
import Calendar from './lib/Calendar'
import template from './template.vue'

export default Vue.component('Calendar', {
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
      calendar: new Calendar().setStartDate(this.startDate).generate(),
      selectedDate: new Date(this.startDate)
    }
  },
  methods: {
    log: function (data) {
      console.log(data)
    },
    selectedMonth: function () {
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