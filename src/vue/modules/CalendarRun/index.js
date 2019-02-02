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
    monthDate: {
      type: Date,
      default: new Date()
    }
  },
  data: function () {
    return {
      calendar: new CalendarRun(),
      month: null
    }
  },
  mounted: function () {
    this.updateMonth()
    if (this.calendar.currentDay) {
      this.$emit('activeDay', this.calendar.currentDay)
    }
  },
  methods: {
    updateMonth() {
      this.month = this.calendar.getMonth(this.monthDate, (day) => {
        if (!day.enabled) {
          return
        }
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
      const monthDate = new Date(month.lastDay)
      monthDate.setDate(monthDate.getDate() + 1)
      this.$emit('changeMonth', monthDate)
    },
    prev: function (month) {
      const monthDate = new Date(month.firstDay)
      monthDate.setDate(monthDate.getDate() - 1)
      this.$emit('changeMonth', monthDate)
    },
    selectDay: function (day) {
      if (this.calendar.isDaySelected(day)) {
        return
      }
      this.calendar.setSelectedDay(day)
      this.$emit('selectDay', day)
    },
  },
  template: template
})