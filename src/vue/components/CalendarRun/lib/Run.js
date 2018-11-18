import Calendar from '@vue/Calendar/lib/Calendar'

class Run extends Calendar {
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
   * @returns {Run|Calendar}
   */
  generate() {
    let index = 0, day = 0
    const trainingMap = this.generateTrainingMap()
    const startTime = this.startDate.getTime()
    const months = this.monthBetween(this.startDate, this.endDateRun(trainingMap), (dayOptions) => {
      if (!trainingMap[index]) {
        return
      }

      if (!dayOptions.enabled) {
        return
      }

      if (dayOptions.date.getTime() < startTime) {
        return
      }

      if (this.isDayRun(day)) {
        dayOptions.setOption('distance', trainingMap[index])
        dayOptions.setOption('result', 0)
        dayOptions.setOption('unit', this.unit)
        index++
      }

      day = day < 6 ? day + 1 : 0
    })
    this.setMonth(months)
    return this
  }
}

export default Run