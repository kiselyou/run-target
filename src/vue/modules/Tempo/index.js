import './style.scss'
import Vue from 'vue'
import template from './template.html'
import Ajax from '@lib/Ajax'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'
import moment from 'moment'
import '@vue/Button'
import '@vue/Rate'
import '@vue/RunProcess'

export default Vue.component('Tempo', {
  props: {
    day: {
      type: Object,
    },
  },
  data: function () {
    return {
      loading: false,
      activities: [],
      selectedActivity: null
    }
  },
  beforeMount: function () {
    if (!this.day) {
      return
    }
    this.loading = true
    Ajax.get(`run/view/activity/${this.day.id}`)
      .then((activities) => {
        this.loading = false
        this.activities = activities
      })
      .catch(() => {
        this.loading = false
      })
  },
  computed: {
    avgValue: function () {
      return 0
    },
    upperValue: function () {
      return 0
    },
    lowerValue: function () {
      return 0
    },
    distances: function () {
      return this.selectedActivity ? this.selectedActivity.distances : []
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).locale('ru').format('DD MMM HH:mm')
    },
    activityName: function (activity) {
      return `${this.formatDate(activity.dateTimeStart)} - ${this.formatDate(activity.dateTimeStop)}`
    },
    activityEmpty: function () {
      return moment(this.day.date).locale('ru').format('DD MMMM')
    },
    distanceNumber() {
      return `1 км 07'51'`
    },
    distanceTime() {
      return `00:07:51`
    },
    distanceValue() {
      return 200
    },
    activityPathLength(activity) {
      let len = 0
      for (const distance of activity.distances) {

        len += distance.pathLength
      }
      return `${(len / 1000).toFixed(3)} км.`
    },
    openActivity(activity) {
      this.selectedActivity = activity
    },
    closeActivity() {
      this.selectedActivity = null
    }
  },
  template: template
})