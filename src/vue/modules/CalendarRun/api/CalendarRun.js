import objectPath from 'object-path'
import Calendar from '@vue/Calendar/api/Calendar'

/**
 * resultDistance растояние в км
 * expectDistance растояние в км
 */
class CalendarRun extends Calendar {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.startKm = 10

    /**
     *
     * @type {number}
     */
    this.targetKm = 42

    /**
     *
     * @type {string}
     */
    this.unit = 'км'

    /**
     * weight - (+) увеличение нагрузки в процентах
     *        - (-) уменьшение нагрузки в процентах
     * start  - Отсчет начала недели
     *
     * @type {Object}
     */
    this.options = [
      {
        day: 0,
        weight: 10,
        correlation: [
          { min: 0, max: 3.9, weight: 30 },
          { min: 4, max: 9.9, weight: 20 },
          { min: 10, max: 14.9, weight: 10 },
          { min: 15, max: 20.9, weight: 10 },
          { min: 21, max: 42, weight: 10 }
        ]
      },
      {
        day: 2,
        weight: - 40,
        correlation: [
          { min: 21, max: 42, weight: - 70 }
        ]
      },
      {
        day: 5,
        weight: - 20,
        correlation: [
          { min: 21, max: 42, weight: - 60 }
        ]
      },
    ]

    /**
     *
     * @type {number}
     */
    this.weeksLimit = 240
  }

  /**
   *
   * @param {number} distance
   * @param {Array} correlation
   * @returns {number}
   */
  correlationDistance(correlation, distance) {
    for (const item of correlation) {
      if (distance >= item.min && distance < item.max) {
        return this.increase(distance, item.weight)
      }
    }
    return distance
  }

  /**
   *
   * @param {number} day
   * @returns {boolean}
   */
  isDayRun(day) {
    for (const item of this.options) {
      if (item.day === day) {
        return true
      }
    }
    return false
  }

  /**
   *
   * @param {number} distance
   * @param {number} percent
   * @param {number} [frictionDigits]
   * @returns {number}
   */
  increase(distance, percent, frictionDigits = 1) {
    return Number((distance * (100 + percent) / 100).toFixed(frictionDigits))
  }

  /**
   *
   * @returns {Array}
   */
  generateTrainingMap() {
    const map = []
    let distance = 0, week = 0
    while (week < this.weeksLimit && distance < this.targetKm) {
      for (let i = 0; i < this.options.length; i++) {
        const options = this.options[i]
        if (i === 0) {
          let prevDistance = map[map.length - this.options.length] || map[map.length - 1]
          if (!prevDistance) {
            distance = this.startKm
          } else {
            distance = this.correlationDistance(options.correlation, this.increase(prevDistance, options.weight, 1))
          }
          if (distance > this.targetKm) {
            distance = this.targetKm
          }
          map.push(distance)
          continue
        }

        map.push(this.correlationDistance(options.correlation, this.increase(distance, options.weight)))
      }
      week++
    }
    return map
  }

  /**
   *
   * @param {Array} trainingMap
   * @returns {Date}
   */
  endDateRun(trainingMap) {
    const days = Math.ceil(trainingMap.length / this.options.length) * 7
    return Calendar.addDays(this.startDate, days)
  }

  /**
   *
   * @returns {CalendarRun|Calendar}
   */
  generate() {
    const months = this.renderTargetMonth()
    this.setMonth(months)
    return this
  }

  /**
   * @param {Day} day
   * @param {number} index
   * @callback targetDayCallback
   */

  /**
   *
   * @param {targetDayCallback} [callback]
   * @returns {Array<Month>}
   */
  renderTargetMonth(callback) {
    let index = 0, dayNumber = 0, runDayNumber = 0
    const trainingMap = this.generateTrainingMap()
    const startTime = this.startDate.getTime()
    return this.monthBetween(this.startDate, this.endDateRun(trainingMap), (day) => {
      if (!trainingMap[index]) {
        return
      }

      if (!day.enabled) {
        return
      }

      if (day.date.getTime() < startTime) {
        return
      }

      day.setOption({
        /**
         * Растояние в км
         *
         * @type {number}
         */
        resultDistance: 0,
        /**
         * Растояние в км
         *
         * @type {number}
         */
        expectDistance: 0,
        /**
         * Растояние в км
         * Тренировка может состоять из нескольких отдельно сохраненных кусков.
         * Здесь массив значений рузультатов каждой дистанции
         *
         * @type {number}
         */
        piecesDistance: []
      })
      if (this.isDayRun(dayNumber)) {
        day.addOption('expectDistance', trainingMap[index])
        index++
      }

      if (callback) {
        callback(day, runDayNumber)
      }
      runDayNumber++
      dayNumber = dayNumber < 6 ? dayNumber + 1 : 0
    })
  }

  /**
   *
   * @returns {Array.<Day>}
   */
  getTargetRunDays() {
    const days = this.getDays()
    return days.filter(day => day.hasOption('expectDistance'))
  }

  /**
   *
   * @returns {{options: Object, startKm: number, targetKm: number, startDate: Date, targetDays: Array<Day>}}
   */
  serialize() {
    return {
      options: this.options,
      startKm: this.startKm,
      targetKm: this.targetKm,
      startDate: this.startDate,
      targetDays: this.getTargetRunDays(),
    }
  }

  /**
   *
   * @param {Object|{options: Object, startKm: number, targetKm: number, startDate: Date, targetDays: Array<Day|Object>}} data
   */
  deserialize(data) {
    this.startKm = data.startKm
    this.targetKm = data.targetKm
    this.options = Array.from(data.options)
    this.startDate = new Date(data.startDate)
    const months = this.renderTargetMonth((day, index) => {
      const targetDay = objectPath.get(data.targetDays, [ index ], {})
      if (targetDay) {
        day.id = targetDay.id
        day.options = targetDay.options
      }
    })
    this.setMonth(months)
    return this
  }
}

export default CalendarRun