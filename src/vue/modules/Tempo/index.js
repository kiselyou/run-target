import './style.scss'
import Vue from 'vue'
import template from './template.html'
import Ajax from '@lib/Ajax'
import Timer from '@lib/Timer'
import moment from 'moment'

import '@vue/Grid/Row'
import '@vue/Grid/Cell'
import '@vue/Button'
import '@vue/Rate'
import '@vue/RunProcess'
import '@module/CalendarRun'
import '@module/Spinner'

const timer = new Timer()

export default Vue.component('Tempo', {
  data: function () {
    return {
      /**
       * @type {boolean}
       */
      loading: true,
      /**
       * @type {Array.<Object>}
       */
      activities: [],
      /**
       * @type {Object}
       */
      selectedActivity: null,
      /**
       * Day from calendar.
       *
       * @type {Day}
       */
      day: null
    }
  },
  computed: {
    /**
     * Массив всех дистанций.
     *
     * @returns {Array}
     */
    distances: function () {
      return this.selectedActivity ? this.selectedActivity.distances : []
    },
    /**
     * Средний темп.
     *
     * @returns {string}
     */
    avgTempo: function () {
      let sum = 0
      for (const distance of this.distances) {
        sum += this.distanceTempoNumber(distance)
      }
      return Number(sum ? sum / this.distances.length : 0).toFixed(2)
    },
    /**
     * Самый быстрый темп.
     *
     * @returns {string}
     */
    upperTempo: function () {
      let upperTempo = + Infinity
      for (const distance of this.distances) {
        const tempo = this.distanceTempoNumber(distance)
        if (tempo < upperTempo) {
          upperTempo = tempo
        }
      }
      return (upperTempo === + Infinity ? 0 : upperTempo).toFixed(2)
    },
    /**
     * Самый медленый темп.
     *
     * @returns {string}
     */
    lowerTempo: function () {
      let lowerTempo = - Infinity
      for (const distance of this.distances) {
        const tempo = this.distanceTempoNumber(distance)
        if (tempo > lowerTempo) {
          lowerTempo = tempo
        }
      }
      return (lowerTempo === - Infinity ? 0 : lowerTempo).toFixed(2)
    },

    /**
     * Максимальный темп.
     *
     * @returns {number}
     */
    maxTempo: function () {
      const tempo = Number(this.lowerTempo)
      return tempo + (tempo / 100 * 10)
    },
    /**
     * Генерация текста если нет активностей.
     *
     * @returns {string|?}
     */
    activityEmpty: function () {
      if (!this.day) {
        return null
      }
      return moment(this.day.date).locale('ru').format('DD MMMM')
    },
  },
  methods: {
    loadActivities(day) {
      this.loading = true
      const timestamp = new Date(day.date).getTime()
      Ajax.get(`activity/view/${timestamp}`)
        .then((activities) => {
          this.loading = false
          this.activities = activities
        })
        .catch(() => {
          this.loading = false
        })
    },
    /**
     * CalendarRun.
     * Метод дня устоновки текущего дня в календаре.
     *
     * @param day
     */
    activeDay: function (day) {
      this.loadActivities(day)
      this.day = day
    },

    /**
     * CalendarRun.
     * Метод дня устоновки выбранного дня в календаре.
     *
     * @param day
     */
    selectDay: function (day) {
      this.loadActivities(day)
      this.day = day
    },
    /**
     * Фарматирование даты.
     *
     * @param {Date|string} date
     * @returns {string}
     */
    formatDate(date) {
      return moment(date).locale('ru').format('DD MMM HH:mm')
    },
    /**
     * Название активности.
     *
     * @param activity
     * @returns {string}
     */
    activityName: function (activity) {
      return `${this.formatDate(activity.dateTimeStart)} - ${this.formatDate(activity.dateTimeStop)}`
    },
    /**
     * Получение темпа из дистанции.
     *
     * @param {Object} distance
     * @returns {number}
     */
    distanceTempoNumber(distance) {
      const pathLength = distance.pathLength > 1000 ? 1000 : distance.pathLength
      if (!distance.prevUKey) {
        return timer.setTime((distance.elapsedTime / pathLength) * 1000).toNumberMinutes()
      }
      const time = (distance.elapsedTime / pathLength) * 1000
      return timer.setTime(time).toNumberMinutes()
    },
    /**
     * Получение темпа из дистанции. Возвращает форматированую строку.
     *
     * @param {Object} distance
     * @returns {string}
     */
    distanceTempoString(distance) {
      const splitValue = this.distanceTempoNumber(distance).toFixed(2).split('.')
      return `${splitValue[0]}'${splitValue[1]}"`
    },
    /**
     * Номер дистанции.
     *
     * @param {Object} distance
     * @returns {string}
     */
    distanceNumber(distance) {
      const distances = this.selectedActivity.distances
      let less = ''
      if (distances[distances.length - 1]['number'] === distance.number && distance.pathLength < 1000) {
        less = `<`;
      }
      return `${less} ${distance.number + 1}`;
    },
    /**
     * Время на дистанции.
     *
     * @param {Object} distance
     * @returns {string}
     */
    distanceTime(distance) {
      const distances = this.selectedActivity.distances
      let elapsedTime = 0
      for (const dist of distances) {
        if (dist.number > distance.number) {
          break
        }
        elapsedTime += dist.elapsedTime
      }
      return timer.setTime(elapsedTime).toStringHours()
    },
    /**
     * Длина всего пути активности.
     *
     * @param {Object} activity
     * @returns {string}
     */
    activityPathLength(activity) {
      let len = 0
      if (activity) {
        for (const distance of activity.distances) {
          len += distance.pathLength
        }
      }
      return (len / 1000).toFixed(3)
    },
    /**
     * Открыть подробную информацию об активности.
     *
     * @param activity
     * @returns {void}
     */
    openActivity(activity) {
      this.selectedActivity = activity
    },
    /**
     * Закрыть подробную информацию об активности.
     *
     * @returns {void}
     */
    closeActivity() {
      this.selectedActivity = null
    }
  },
  template: template
})