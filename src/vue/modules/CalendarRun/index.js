import './style.scss'
import Vue from 'vue'
import './MonthRun'
import template from './template.html'
import CalendarRun from './api/CalendarRun'
import objectPath from 'object-path'
import moment from 'moment'

export default Vue.component('CalendarRun', {
  props: {
    calendarActivity: {
      type: Object,
      default: null
    },
    locale: {
      type: String,
      default: 'ru'
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data: function () {
    return {
      calendar: new CalendarRun(),
      selectedDate: new Date(),
      month: null
    }
  },
  mounted: function () {
    if (this.calendar.currentDay) {
      this.$emit('activeDay', this.calendar.currentDay)
    }
    this.updateMonth()
  },
  methods: {
    updateMonth() {
      this.month = this.calendar.getMonth(this.selectedDate, (day) => {
        const date = moment(day.date).format('YYYY-MM-DD')
        const resultDistance = objectPath.get(this.calendarActivity, [date, 'resultDistance'], null)
        if (resultDistance) {
          day.addOption('resultDistance', resultDistance / 1000)
        }
        const expectDistance = objectPath.get(this.calendarActivity, [date, 'expectDistance'], null)
        if (expectDistance) {
          day.addOption('expectDistance', expectDistance / 1000)
        }
      })
    },
    next: function (month) {
      this.selectedDate = new Date(month.lastDay)
      this.selectedDate.setDate(this.selectedDate.getDate() + 1)
      this.updateMonth()
    },
    prev: function (month) {
      this.selectedDate = new Date(month.firstDay)
      this.selectedDate.setDate(this.selectedDate.getDate() - 1)
      this.updateMonth()
    },
    selectDay: function (day) {
      this.calendar.setSelectedDay(day)
      this.$emit('selectDay', day)
    },
  },
  template: template
})