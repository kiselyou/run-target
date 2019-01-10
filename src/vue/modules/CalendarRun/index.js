import './style.scss'
import Vue from 'vue'
import './MonthRun'
import '@module/Spinner'
import Ajax from '@lib/Ajax'
import template from './template.html'
import CalendarRun from './api/CalendarRun'

export default Vue.component('CalendarRun', {
  props: {
    locale: {
      type: String,
      default: 'ru'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      calendar: new CalendarRun(),
      selectedDate: new Date(),
      targetId: 32
    }
  },
  beforeMount: function () {
    Ajax.get(`/calendar/view/${this.targetId}`)
      .then((data) => {
        console.log(data)
        if (Object.keys(data).length > 0) {
          this.calendar.deserialize(data)
          this.$emit('activeDay', this.calendar.currentDay)
        }
      })
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
      this.$emit('selectDay', day)
    }
  },
  template: template
})