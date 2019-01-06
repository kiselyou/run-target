import './style.scss'
import Vue from 'vue'
import template from './template.html'
import Ajax from '@lib/Ajax'
import Timer from '@lib/Timer'
import moment from 'moment'
import Plugins from '@lib/cordova/Plugins'

import '@vue/Tooltip'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'
import '@vue/Button'
import '@vue/VueIcon'
import '@vue/Rate'
import '@vue/RunProcess'
import '@module/CalendarRun'
import '@module/Spinner'
import domToImage from 'dom-to-image'

const timer = new Timer()

export default Vue.component('Tempo', {
  data: function () {
    return {
      /**
       * @type {boolean}
       */
      loading: true,
      /**
       * @type {string}
       */
      imgTooltip: '',
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
    isVisibleImgTooltip: function() {
      return Boolean(this.imgTooltip)
    },
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
     * @returns {number}
     */
    avgTempoMinutes: function () {
      let time = 0
      let path = 0
      for (const distance of this.distances) {
        time += distance.elapsedTime
        path += distance.pathLength
      }

      return this.timeToMinutes(time / path * 1000)

    },
    /**
     * Средний темп.
     *
     * @returns {number}
     */
    avgTempoString() {
      return this.minutesToStringTempo(this.avgTempoMinutes)
    },
    /**
     * Самый быстрый темп.
     *
     * @returns {number}
     */
    upperTempoMinutes: function () {
      let upperTempo = + Infinity
      for (const distance of this.distances) {
        const tempo = this.distanceTempoTime(distance)
        if (tempo < upperTempo) {
          upperTempo = tempo
        }
      }
      return Number((upperTempo === + Infinity ? 0 : upperTempo).toFixed(2))
    },
    /**
     * Самый быстрый темп.
     *
     * @returns {string}
     */
    upperTempoString() {
      return this.minutesToStringTempo(this.upperTempoMinutes)
    },
    /**
     * Самый медленый темп.
     *
     * @returns {string}
     */
    lowerTempoMinutes: function () {
      let lowerTempo = - Infinity
      for (const distance of this.distances) {
        const tempo = this.distanceTempoTime(distance)
        if (tempo > lowerTempo) {
          lowerTempo = tempo
        }
      }
      return (lowerTempo === - Infinity ? 0 : lowerTempo).toFixed(2)
    },
    /**
     * Самый медленый темп.
     *
     * @returns {string}
     */
    lowerTempoString() {
      return this.minutesToStringTempo(this.lowerTempoMinutes)
    },
    /**
     * Максимальный темп.
     *
     * @returns {number}
     */
    maxTempo: function () {
      const tempo = Number(this.lowerTempoMinutes)
      return tempo + (tempo / 100 * 20)
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
    htmlClassBtnMakeScreen() {
      return {
        'tempo_btn__disabled': !Plugins.file.isPluginEnabled
      }
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
    formatDateTime(date) {
      return moment(date).locale('ru').format('DD MMM HH:mm')
    },
    /**
     * Фарматирование даты.
     *
     * @param {Date|string} date
     * @returns {string}
     */
    formatDate(date) {
      return moment(date).locale('ru').format('DD MMM')
    },
    /**
     * Фарматирование даты.
     *
     * @param {Date|string} date
     * @returns {string}
     */
    formatTime(date) {
      return moment(date).format('HH:mm')
    },
    /**
     * Название активности.
     *
     * @param activity
     * @returns {string}
     */
    activityName: function (activity) {
      return `${this.formatDateTime(activity.dateTimeStart)} - ${this.formatTime(activity.dateTimeStop)}`
    },
    /**
     * Получение темпа из дистанции.
     *
     * @param {Object} distance
     * @returns {number}
     */
    distanceTempoTime(distance) {
      const pathLength = distance.pathLength > 1000 ? 1000 : distance.pathLength
      if (pathLength > 0) {
        return this.timeToMinutes((distance.elapsedTime / pathLength) * 1000)
      }
      return 0
    },
    /**
     *
     * @param {number} time
     * @returns {number}
     */
    timeToMinutes(time) {
      return timer.setTime(time).toNumberMinutes()
    },
    /**
     *
     * @param {number} minutes
     * @returns {string}
     */
    minutesToStringTempo(minutes) {
      const splitValue = Number(minutes).toFixed(2).split('.')
      return `${splitValue[0]}'${splitValue[1]}"`
    },
    /**
     * Получение темпа из дистанции. Возвращает форматированую строку.
     *
     * @param {Object} distance
     * @returns {string}
     */
    distanceToTempoString(distance) {
      return this.minutesToStringTempo(this.distanceTempoTime(distance))
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
    showImgTooltip: function(content) {
      this.imgTooltip = content
      return this
    },
    autoHideImgTooltip: function() {
      setTimeout(() => {
        this.imgTooltip = ''
      }, 5000)
    },
    makeScreen() {
      if (!Plugins.file.isPluginEnabled) {
        return
      }
      this.loading = true
      const node = document.getElementById('tempo-statistics')
      domToImage.toPng(node)
        .then((dataUrl) => {
          Plugins.file.write(
            dataUrl,
            () => {
              this.loading = false
              this.showImgTooltip('Изображение сохранено в галерее.').autoHideImgTooltip()
            },
            () => {
              this.loading = false
              this.showImgTooltip('Не могу сохранить файл.').autoHideImgTooltip()
            })
        })
        .catch(() => {
          this.loading = false
          this.showImgTooltip('Изображение не доступно.').autoHideImgTooltip()
        })
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