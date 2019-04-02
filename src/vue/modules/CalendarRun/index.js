import './style.scss'
import Vue from 'vue'
import './MonthRun'
import template from './template.html'
import CalendarRun from './api/CalendarRun'
import objectPath from 'object-path'
import { mapState } from 'vuex'
import { dayTimestamp } from '@lib/helpers/date-helper'

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
  },
  data: function () {
    return {
      calendar: new CalendarRun(),
      monthTimestamp: new Date().getTime(),
    }
  },
  mounted: function () {
    if (this.calendar.currentDay) {
      this.$store.commit('calendar/setSelectedDay', this.calendar.currentDay)
      this.$emit('activeDay', this.calendar.currentDay)
    }
  },
  computed: {
    ...mapState({
      /**
       * @param {Object} state
       * @returns {{[string]: { resultDistance: number, expectDistance: number }}}
       */
      calendarActivity: (state) => {
        return state.calendar.calendarActivity
      },
      /**
       *
       * @returns {Day|?}
       */
      selectedDay: (state) => {
        return state.calendar.selectedDay
      }
    }),
    month() {
      const month = this.calendar.getMonth(new Date(this.monthTimestamp))
      for (const week of month.weeks) {
        for (const day of week.days) {
          if (!day.enabled) {
            continue
          }
          const date = new Date(day.date).toUTCString()
          const totalDistance = objectPath.get(this.calendarActivity, [date, 'totalDistance'], null)
          if (totalDistance) {
            day.addOption('totalDistance', totalDistance / 1000)
          }
          const expectDistance = objectPath.get(this.calendarActivity, [date, 'expectDistance'], null)
          if (expectDistance) {
            day.addOption('expectDistance', expectDistance / 1000)
          }
        }
      }
      return month
    },
  },
  methods: {
    next: function (month) {
      const next = new Date(month.lastDay)
      next.setDate(next.getDate() + 1)
      this.monthTimestamp = next.getTime()
    },
    prev: function (month) {
      const prev = new Date(month.firstDay)
      prev.setDate(prev.getDate() - 1)
      this.monthTimestamp = prev.getTime()
    },
    selectDay: function (day) {
      this.$store.commit('calendar/setSelectedDay', day)
      this.$emit('selectDay', day)
    },
  },
  template: template
})