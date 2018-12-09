import './style.scss'
import Vue from 'vue'
import './MonthRun'
import '@module/Spinner'
import Ajax from '@lib/Ajax'
import template from './template.html'
import CalendarRun from './api/CalendarRun'

export default Vue.component('CalendarRun', {
  props: {
    targetId: {
      type: Number,
      require: true
    },
    locale: {
      type: String,
      default: 'ru'
    },
  },
  data: function () {
    return {
      calendar: new CalendarRun(),
      selectedDate: new Date(),
    }
  },
  beforeMount: function () {
    Ajax.get(`/run/view/calendar/${this.targetId}`)
      .then((calendarOptions) => {
        if (Object.keys(calendarOptions).length > 0) {
          this.calendar.deserialize(calendarOptions)
          this.$emit('activeDay', this.calendar.currentDay)
        }
      })
  },
  mounted: function () {
    this.$emit('activeDay', this.calendar.currentDay)
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