import './style.scss'
import Vue from 'vue'
import CalendarRun from './api/CalendarRun'
import './MonthRun'
import template from './template.html'

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
      calendar: new CalendarRun().setStartDate(this.startDate).generate(),
      selectedDate: new Date(this.startDate)
    }
  },
  mounted: function () {
    this.$emit('onMounted', this.calendar.currentDay)
  },
  methods: {
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
    },
    selectDay: function (day) {
      this.calendar.setSelectedDay(day)
      this.$emit('onActiveDay', this.calendar.selectedDay)
    }
  },
  template: template
})