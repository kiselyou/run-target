import './style.scss'
import Vue from 'vue'
import CalendarRun from './api/CalendarRun'
import './MonthRun'
import '@module/Spinner'
import template from './template.html'
import Ajax from '@lib/Ajax'

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
      loading: true
    }
  },
  beforeMount: function () {
    Ajax.get(`/target/run/${this.targetId}`)
      .then((calendarOptions) => {
        this.calendar.deserialize(calendarOptions)
        this.loading = false
      })

  },
  mounted: function () {
    this.$emit('onChangeDay', this.calendar.currentDay)
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