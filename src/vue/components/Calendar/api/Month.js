import { _lang, DEFAULT_LOCALE } from './_lang'
import objectPath from 'object-path'

class Month {
  /**
   * @param {Array.<Week>} weeks
   * @param {Date} firstDay
   * @param {Date} lastDay
   */
  constructor(weeks, firstDay, lastDay) {
    /**
     *
     * @type {Array<Week>}
     */
    this.weeks = weeks

    /**
     *
     * @type {Date}
     */
    this.firstDay = firstDay

    /**
     *
     * @type {Date}
     */
    this.lastDay = lastDay
  }

  /**
   *
   * @returns {number}
   */
  get month() {
    return this.firstDay.getMonth()
  }

  /**
   *
   * @returns {number}
   */
  get year() {
    return this.firstDay.getFullYear()
  }

  /**
   *
   * @param {string} [locale]
   * @returns {string}
   */
  getName(locale) {
    return objectPath.get(_lang, [locale, 'monthNames', this.month], null) ||
      objectPath.get(_lang, [DEFAULT_LOCALE, 'monthNames', this.month], null)
  }

  /**
   *
   * @param {string} [locale]
   * @returns {string}
   */
  getNameShort(locale) {
    return objectPath.get(_lang, [locale, 'monthNamesShort', this.month], null) ||
      objectPath.get(_lang, [DEFAULT_LOCALE, 'monthNamesShort', this.month], null)
  }

  eachEnabledDay(callback) {
    for (const week of this.weeks) {
      for (const day of week.days) {
        if (!day.enabled) {
          continue
        }
        callback(day, week)
      }
    }
  }

  /**
   *
   * @returns {Array.<DayRun>}
   */
  getDays() {
    const days = []
    this.eachEnabledDay((day) => {
      days.push(day)
    })
    return days
  }

  /**
   *
   * @param {Day} activeDay
   * @returns {Month}
   */
  setActiveDay(activeDay) {
    this.eachEnabledDay((day) => {
      day.setActive(activeDay.date.getTime() === day.date.getTime())
    })
    return this
  }

  /**
   *
   * @returns {Array}
   */
  get weekDays() {
    return this.weeks.length > 0 ? this.weeks[0]['days'] : []
  }
}

export default Month