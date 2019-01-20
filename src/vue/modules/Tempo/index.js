import './style.scss'
import Vue from 'vue'
import template from './template.html'
import Ajax from '@lib/Ajax'
import Timer from '@lib/Timer'
import moment from 'moment'
import Plugins from '@lib/cordova/Plugins'

import '@vue/Title'
import '@vue/Layout'
import '@vue/Tooltip'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'
import '@vue/Button'
import '@vue/VueIcon'
import '@vue/Rate'
import '@vue/RunProcess'
import '@vue/WrapCorner'
import '@vue/SquareArea'
import '@vue/SquareItem'
import '@module/CalendarRun'
import '@module/Confirm'
import '@module/Spinner'
import '@module/Rating'
import '@module/TempoForm'

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
      day: null,
      /**
       * @type {Object|?}
       */
      calendarActivity: null,
      /**
       * @type {boolean}
       */
      confirmRemoveEnable: false,
      /**
       * @type {string|?} (no-activities|list-activities|details-activity|form-activity)
       */
      view: 'no-activities',
      /**
       * @type {string|?} (no-activities|list-activities|details-activity|form-activity)
       */
      prevView: null
    }
  },
  beforeMount: function () {
    this.loadCalendarActivity()
  },
  computed: {
    isVisibleImgTooltip: function() {
      return Boolean(this.imgTooltip)
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
    isDisabledBtnMakeScreen() {
      return !Plugins.file.isPluginEnabled
    },
    viewTitle() {
      switch (this.view) {
        case 'form-activity':
          return 'Новая активность'
        case 'list-activities':
        case 'no-activities':
          return 'Список активностей'
        case 'details-activity':
          return this.activityName(this.selectedActivity)
      }
      return null
    },
    viewTitleDescription() {
      switch (this.view) {
        case 'form-activity':
          return this.day ? this.formatDate(this.day.date, 'DD MMMM') : null
      }
      return null
    },
  },
  methods: {
    isViewVisible(view) {
      if (Array.isArray(view)) {
        return view.includes(this.view)
      }
      return this.view === view
    },
    showViewFormActivity() {
      this.prevView = this.view
      this.view = 'form-activity'
    },
    showViewNoActivities() {
      this.prevView = this.view
      this.view = 'no-activities'
    },
    showViewListActivities() {
      this.prevView = this.view
      this.view = this.activities.length > 0 ? 'list-activities' : 'no-activities'
    },
    showViewDetailsActivity() {
      this.prevView = this.view
      this.view = 'details-activity'
    },
    showPrevView() {
      this.view = this.prevView
      this.prevView = null
    },
    /**
     * Массив всех дистанций.
     *
     * @param {Object|?} activity
     * @returns {Array}
     */
    distances(activity) {
      return activity ? activity.distances : []
    },
    /**
     * Средний темп.
     *
     * @param {Object|?} activity
     * @returns {number}
     */
    avgTempoMinutes(activity) {
      let time = 0
      let path = 0
      const distances = this.distances(activity)
      for (const distance of distances) {
        time += distance.elapsedTime
        path += distance.pathLength
      }

      return this.timeToMinutes(time / path * 1000)
    },
    /**
     * Самый быстрый темп.
     *
     * @param {Object|?} activity
     * @returns {string}
     */
    upperTempoString(activity) {
      return this.minutesToStringTempo(this.upperTempoMinutes(activity))
    },
    /**
     * Самый быстрый темп.
     *
     * @param {Object|?} activity
     * @returns {number}
     */
    upperTempoMinutes(activity) {
      let upperTempo = + Infinity
      const distances = this.distances(activity)
      for (const distance of distances) {
        const tempo = this.distanceTempoTime(distance)
        if (tempo < upperTempo) {
          upperTempo = tempo
        }
      }
      return Number((upperTempo === + Infinity ? 0 : upperTempo).toFixed(2))
    },
    /**
     * Самый медленый темп.
     *
     * @param {Object|?} activity
     * @returns {string}
     */
    lowerTempoMinutes(activity) {
      let lowerTempo = - Infinity
      const distances = this.distances(activity)
      for (const distance of distances) {
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
     * @param {Object|?} activity
     * @returns {string}
     */
    lowerTempoString(activity) {
      return this.minutesToStringTempo(this.lowerTempoMinutes(activity))
    },
    /**
     * Максимальный темп.
     *
     * @param {Object|?} activity
     * @returns {number}
     */
    maxTempo(activity) {
      const tempo = Number(this.lowerTempoMinutes(activity))
      return tempo + (tempo / 100 * 20)
    },
    /**
     * Средний темп.
     *
     * @param {Object|?} activity
     * @returns {number}
     */
    avgTempoString(activity) {
      return this.minutesToStringTempo(this.avgTempoMinutes(activity))
    },
    /**
     * TODO: вынести загрузку данных календаря на 1 уровень в верх
     * @param {Day} day
     */
    loadCalendarActivity(day) {
      const timestamp = day ? day.date.getTime() : Date.now()
      Ajax.get(`/calendar/view/tempo/${timestamp}`)
        .then((data) => {
          this.loading = false
          this.calendarActivity = data
        })
        .catch(() => {
          this.loading = false
        })
    },
    loadActivities(day) {
      this.loading = true
      const timestamp = new Date(day.date).getTime()
      Ajax.get(`activity/view/${timestamp}`)
        .then((activities) => {
          this.loading = false
          this.activities = activities
          this.showViewListActivities()
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
     * @param {string} [format]
     * @returns {string}
     */
    formatDate(date, format = 'DD MMM') {
      return moment(date).locale('ru').format(format)
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
      if (distance.pathLength > 0) {
        return this.timeToMinutes((distance.elapsedTime / distance.pathLength) * 1000)
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
     * @param {Object} activity
     * @param {Object} distance
     * @returns {string}
     */
    distanceNumber(activity, distance) {
      let less = ''
      const distances = this.distances(activity)
      if (distances[distances.length - 1]['number'] === distance.number && distance.pathLength < 1000) {
        less = `<`;
      }
      return `${less} ${distance.number + 1}`;
    },
    /**
     * Время на дистанции.
     *
     * @param {Object} activity
     * @param {Object} distance
     * @returns {string}
     */
    distanceTime(activity, distance) {
      const distances = this.distances(activity)
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
        const distances = this.distances(activity)
        for (const distance of distances) {
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
      this.showViewDetailsActivity()
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
      const node = document.getElementById('tempo-background')
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
      this.showViewListActivities()
    },

    showConfirmRemoveActivity() {
      this.confirmRemoveEnable = true
    },

    cancelRemoveActivity() {
      this.confirmRemoveEnable = false
    },

    confirmRemoveActivity() {
      this.cancelRemoveActivity()
      this.showPrevView()
      this.loading = true
      Ajax.post(`activity/remove`, { activityId: this.selectedActivity.id})
        .finally(() => {
          this.loading = false
          this.selectedActivity = null
          this.loadActivities(this.day)
        })
    },

    saveActivity(formData) {
      this.loading = true
      Ajax.post(`activity/save/custom`, { ...formData, date: this.day.date })
        .finally(() => {
          this.loading = false
          this.loadActivities(this.day)
        })
    }
  },
  template: template
})