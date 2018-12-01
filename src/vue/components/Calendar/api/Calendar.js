import Day from './Day'
import Week from './Week'
import Month from './Month'

class Calendar {
  constructor() {
    /**
     *
     * @type {Date}
     */
    this.startDate = new Date()

    /**
     *
     * @type {Array.<Month>}
     */
    this.months = []

    /**
     *
     * @type {Day|?}
     */
    this.currentDay = null
  }

  /**
   *
   * @param {Day} value
   */
  setCurrentDay(value) {
    this.currentDay = value
    return this
  }

  /**
   *
   * @param {Day} value
   */
  setSelectedDay(value) {
    this.selectedDay = value
    return this
  }

  /**
   *
   * @param {string|Date} value
   */
  setStartDate(value) {
    this.startDate = new Date(value)
    return this
  }

  /**
   *
   * @param {Month|Array.<Month>} months
   * @returns {Calendar}
   */
  setMonth(months) {
    this.months.splice(0)
    if (Array.isArray(months)) {
      for (const item of months) {
        this.addMonth(item)
      }
    }
    if (months instanceof Month) {
      this.addMonth(months)
    }
    return this
  }

  /**
   *
   * @param {Month} month
   * @returns {Calendar}
   */
  addMonth(month) {
    if (!this.isMonth(month)) {
      this.months.push(month)
    }
    return this
  }

  /**
   *
   * @param {Date} date
   * @param {eachDayCallback} [callback]
   * @returns {Month}
   */
  getMonth(date, callback) {
    return this.findMonth(date) || this.month(date, callback)
  }

  /**
   *
   * @param {Month} month
   * @returns {boolean}
   */
  isMonth(month) {
    return !!this.findMonth(month.firstDay)
  }

  /**
   *
   * @param {Date} date
   * @returns {Month|?}
   */
  findMonth(date) {
    const time = date.getTime()
    for (const item of this.months) {
      if (time >= item.firstDay.getTime() && time <= item.lastDay.getTime()) {
        return item
      }
    }
    return null
  }

  /**
   * @param {Day} day
   * @param {boolean} isNow
   * @callback eachDayCallback
   */

  /**
   *
   * @param {string|Date} dateFrom
   * @param {boolean} [disabled]
   * @param {eachDayCallback} [callback]
   * @returns {Week}
   */
  week(dateFrom, disabled = false, callback) {
    const from = new Date(dateFrom)
    const week = new Week()
    for (let day = 1; day <= 7; day++) {
      let date, enabled
      if (from.getDay() === day) {
        date = from
        enabled = true
      } else if (day > from.getDay()) {
        const diff = day - from.getDay()
        date = Calendar.addDays(from, diff)
        enabled = true
      } else if (day < from.getDay()) {
        const diff = from.getDay() - day
        date = Calendar.addDays(from, - diff)
        enabled = false
      }

      if (date && from.getMonth() !== date.getMonth()) {
        enabled = false
      }

      enabled = disabled ? false : enabled
      const dayOptions = new Day(date, enabled)

      let isNow = false
      if (dayOptions.isNow) {
        isNow = true
        this.currentDay = dayOptions
      }
      if (callback) {
        callback(dayOptions, isNow)
      }
      week.addDay(dayOptions)
    }
    return week
  }

  /**
   *
   * @param {string|Date} dateFrom
   * @param {eachDayCallback} [callback]
   * @returns {Month}
   */
  month(dateFrom, callback) {
    const from = new Date(dateFrom)
    const firstDay = Calendar.getFirstDayOfMonth(from)
    const lastDay = Calendar.getLastDayOfMonth(from)

    let i = 0
    let prevWeek = this.week(firstDay, false, callback)
    const weeks = [prevWeek]
    while (i < 5) {
      i++
      if (!prevWeek.lastDate) {
        break
      }

      const nextDate = Calendar.addDays(prevWeek.lastDate, 1)
      let disabled = false
      if (lastDay.getMonth() !== nextDate.getMonth()) {
        disabled = true
      }

      const week = this.week(nextDate, disabled, callback)
      weeks.push(week)
      prevWeek = week
    }

    return new Month(weeks, firstDay, lastDay)
  }

  /**
   *
   * @param {string|Date} from
   * @param {string|Date|?} [to]
   * @param {eachDayCallback} [callback]
   * @returns {Array.<Month>}
   */
  monthBetween(from, to = null, callback) {
    const firstDay = Calendar.getFirstDayOfMonth(from)
    const lastDay = Calendar.getLastDayOfMonth(to || from)

    let prevMonth = this.month(firstDay, callback)
    let months = [prevMonth]

    let start = true
    while (start) {
      if (prevMonth.lastDay.getTime() >= lastDay.getTime()) {
        break
      }

      const nextDate = Calendar.addDays(prevMonth.lastDay, 1)
      prevMonth = this.month(nextDate, callback)
      months.push(prevMonth)
    }

    return months
  }

  /**
   *
   * @returns {Calendar}
   */
  generate() {
    this.setMonth(this.month(this.startDate))
    return this
  }

  /**
   *
   * @returns {Array.<Day>}
   */
  getDays() {
    const days = []
    for (const month of this.months) {
      const monthDays = month.getDays()
      for (const day of monthDays) {
        days.push(day)
      }
    }
    return days
  }

  /**
   *
   * @returns {Object}
   */
  serialize() {
    return {
      startDate: this.startDate,
    }
  }

  /**
   *
   * @param {Object} data
   */
  deserialize(data) {
    this.startDate = new Date(data.startDate)
    this.generate()
    return this
  }

  /**
   *
   * @param {string|Date} date
   * @param {number} days
   * @returns {Date}
   */
  static addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  /**
   *
   * @param {string|Date} date
   * @returns {Date}
   */
  static getFirstDayOfMonth(date) {
    const result = new Date(date)
    result.setDate(1)
    return result
  }

  /**
   *
   * @param {string|Date} date
   * @returns {Date}
   */
  static getLastDayOfMonth(date) {
    date = new Date(date)
    date.setDate(1)
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    return date
  }
}

export default Calendar