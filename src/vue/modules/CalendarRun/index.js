import './style.scss'
import Vue from 'vue'
import './MonthRun'
import '@module/Spinner'
import Ajax from '@lib/Ajax'
import template from './template.html'
import CalendarRun from './api/CalendarRun'
import objectPath from 'object-path'
import moment from 'moment'

export default Vue.component('CalendarRun', {
  props: {
    locale: {
      type: String,
      default: 'ru'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    calendarActivity: {
      type: Object,
      default: null
    }
  },
  data: function () {
    return {
      calendar: new CalendarRun(),
      selectedDate: new Date(),
      targetId: 32
    }
  },
  mounted: function () {
    if (this.calendar.currentDay) {
      this.$emit('activeDay', this.calendar.currentDay)
    }
  },
  computed: {
    month: function () {
      if (!this.calendarActivity) {
        return this.calendar.getMonth(this.selectedDate)
      }

      return this.calendar.getMonth(this.selectedDate, (day) => {
        const date = moment(day.date).format('YYYY-MM-DD')
        const resultDistance = objectPath.get(this.calendarActivity, [date, 'resultDistance'], null)
        if (resultDistance) {
          day.addOption('resultDistance', resultDistance / 1000)
        }
      })
    },
  },
  methods: {
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