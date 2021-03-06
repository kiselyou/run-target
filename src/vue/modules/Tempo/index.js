import './style.scss'
import Vue from 'vue'
import template from './template.html'
import Timer from '@lib/Timer'
import moment from 'moment'
import Plugins from '@lib/cordova/Plugins'
import { joinDateAndTime } from '@lib/helpers/date-helper'

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
import '@vue/PanelCollapse'
import '@module/CalendarRun'
import '@module/Confirm'
import '@module/Spinner'
import '@module/Rating'
import '@module/TempoForm'
import '@module/HRMChart'
import '@module/AltitudeChart'

import { mapState } from 'vuex'

import domToImage from 'dom-to-image'

const timer = new Timer()

export default Vue.component('Tempo', {
  data: function () {
    return {
      /**
       * @type {boolean}
       */
      synchronizeProcess: false,
      /**
       * @type {string}
       */
      imgTooltip: '',
      /**
       * @type {Object}
       */
      selectedActivity: null,
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
  computed: {
    ...mapState({
      dayActivities: (state) => {
        return state.activity.dayActivities
      },
      /**
       * Selected day from calendar.
       *
       * @returns {Day|?}
       */
      selectedDay: (state) => {
        return state.calendar.selectedDay
      },
      /**
       *
       * @param {Object} state
       * @returns {boolean}
       */
      loading: (state) => {
        return state.activity.loading
      }
    }),
    isVisibleImgTooltip: function() {
      return Boolean(this.imgTooltip)
    },
    /**
     * Генерация текста если нет активностей.
     *
     * @returns {string|?}
     */
    activityEmpty: function () {
      if (!this.selectedDay) {
        return null
      }
      return moment(this.selectedDay.date).locale('ru').format('DD MMMM')
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
          return this.selectedDay ? this.formatDate(this.selectedDay.date, 'DD MMMM') : null
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
      this.view = this.dayActivities.length > 0 ? 'list-activities' : 'no-activities'
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
     * Массив точек для построения графика пульса.
     *
     * @param {Object|?} activity
     * @returns {Array}
     */
    hrmChartPoints(activity) {
      const distances = this.distances(activity)
      const points = []
      let prevTimestamp = null
      for (const distance of distances) {
        for (const point of distance.points) {
          const hrm = point.position[6] || 0
          const timestamp = point.position[0]

          if (prevTimestamp && distance.points.length > 100 && (timestamp - prevTimestamp) < 8000) {
            continue
          }
          prevTimestamp = timestamp
          points.push({ x: timestamp, y: hrm })
        }
      }
      return points
    },
    /**
     * Массив построения графика набора высоты.
     *
     * @param {Object|?} activity
     * @returns {Array}
     */
    altitudeChartPoints(activity) {
      const distances = this.distances(activity)
      const points = []

      let prevTimestamp = null
      for (const distance of distances) {
        for (const point of distance.points) {
          const altitude = point.position[4]
          if (!altitude) {
            continue
          }
          const timestamp = point.position[0]

          if (prevTimestamp && distance.points.length > 100 && (timestamp - prevTimestamp) < 4000) {
            continue
          }
          prevTimestamp = timestamp
          points.push({ x: timestamp, y: altitude })
        }
      }
      return points
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
        if (this.isShortDistance(distance) && distances.length > 1) {
          continue
        }

        time += distance.elapsedTime
        path += distance.pathLength
      }

      return path > 0 ? this.timeToMinutes(time / path * 1000) : 0
    },
    isShortDistance(distance) {
      return distance.pathLength < 500
    },
    distanceRateSkin(distance) {
      return this.isShortDistance(distance) ? 'disabled' : 'success'
    },
    avgHRMonDistance(distance) {
      return distance.avgHRM || 0
    },
    avgHRM(activity) {
      const cache = { rate: 0, count: 0 }
      const distances = this.distances(activity)
      for (const distance of distances) {
        cache.rate += this.avgHRMonDistance(distance)
        cache.count++
      }
      return cache.count > 0 ? Math.round(cache.rate / cache.count) : 0
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
        if (this.isShortDistance(distance) && distances.length > 1) {
          continue
        }
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
     * @returns {number}
     */
    lowerTempoMinutes(activity) {
      let lowerTempo = - Infinity
      const distances = this.distances(activity)
      for (const distance of distances) {
        if (this.isShortDistance(distance) && distances.length > 1) {
          continue
        }
        const tempo = this.distanceTempoTime(distance)
        if (tempo > lowerTempo) {
          lowerTempo = tempo
        }
      }
      return Number((lowerTempo === - Infinity ? 0 : lowerTempo).toFixed(2))
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
     *
     * @param {Date} date
     */
    loadActivities(date) {
      this.$store.dispatch('activity/load', date)
        .then(() => {
          this.showViewListActivities()
        })
    },
    synchronizeActivities() {
      if (this.synchronizeProcess) {
        return
      }
      this.synchronizeProcess = true
      this.$store.dispatch('details/update')
      this.$store.dispatch('calendar/update')
      this.$store.dispatch('activity/synchronize')
        .then(() => {
          this.synchronizeProcess = false
        })
    },
    /**
     * CalendarRun.
     * Метод дня устоновки текущего дня в календаре.
     *
     * @param day
     */
    activeDay: function (day) {
      this.loadActivities(this.selectedDay.date)
    },
    /**
     * CalendarRun.
     * Метод дня устоновки выбранного дня в календаре.
     *
     * @param day
     */
    selectDay: function (day) {
      this.loadActivities(this.selectedDay.date)
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
    totalTime(activity) {
      const distances = this.distances(activity)
      let elapsedTime = 0
      for (const dist of distances) {
        elapsedTime += dist.elapsedTime
      }
      return timer.setTime(elapsedTime).toStringHours()
    },
    showMap(activity) {
      const distances = this.distances(activity)
      const points = []
      for (const distance of distances) {
        for (const point of distance.points) {
          points.push({ lat: point.position[1], lng: point.position[2] })
        }
      }

      this.$store.commit('map/setPoints', points)
      this.$store.commit('map/show')
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
      this.$store.dispatch('activity/startLoading')
      const node = document.getElementById('tempo-background')
      domToImage.toPng(node)
        .then((dataUrl) => {
          Plugins.file.write(
            dataUrl,
            () => {
              this.showImgTooltip('Изображение сохранено в галерее.').autoHideImgTooltip()
            },
            () => {
              this.showImgTooltip('Не могу сохранить файл.').autoHideImgTooltip()
            })
        })
        .catch(() => {
          this.showImgTooltip('Изображение не доступно.').autoHideImgTooltip()
        })
        .finally(() => {
          this.$store.dispatch('activity/stopLoading')
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

    /**
     * Удалить активность и перегенерировать текущий компонент.
     *
     * @returns {void}
     */
    confirmRemoveActivity() {
      this.cancelRemoveActivity()
      const { date, id } = this.selectedActivity
      this.$store.dispatch('activity/remove', id)
        .then(async () => {
          await this.$store.dispatch('details/update')
          await this.$store.dispatch('calendar/update')
          await this.$store.dispatch('activity/update', date)
          await this.$store.dispatch('activity/load', date)
          this.showViewListActivities()
        })
    },
    /**
     * Сохранить активность и перегенерировать текущий компонент.
     *
     * @param {Object} formData
     * @returns {void}
     */
    saveActivity(formData) {
      const { date } = this.selectedDay
      const activity = Object.assign({
        dateTimeStart: joinDateAndTime(date, formData.timeStart),
        dateTimeStop: joinDateAndTime(date, formData.timeStop)
      }, formData)

      this.$store.dispatch('activity/saveCustom', activity)
        .then(async () => {
          await this.$store.dispatch('details/update')
          await this.$store.dispatch('calendar/update')
          await this.$store.dispatch('activity/update', date)
          await this.$store.dispatch('activity/load', date)
          this.showViewListActivities()
        })
    },
  },
  template: template
})