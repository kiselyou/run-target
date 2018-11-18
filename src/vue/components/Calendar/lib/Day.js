import { _lang, DEFAULT_LOCALE } from './_lang'
import objectPath from 'object-path'
import uuid from 'uuid/v4'

const startDateTime = new Date()
startDateTime.setHours(0, 0, 0)
const endDateTime = new Date()
endDateTime.setHours(23, 59, 59)

class Day {
  /**
   *
   * @param {Date} date
   * @param {boolean} enabled
   */
  constructor(date, enabled) {
    /**
     * @type {string}
     */
    this.id = uuid()

    /**
     *
     * @type {Date}
     */
    this.date = date

    /**
     *
     * @type {boolean}
     */
    this.enabled = enabled

    /**
     * Custom options.
     *
     * @type {Object}
     */
    this.options = {}
  }

  /**
   *
   * @param {string} key
   * @returns {boolean}
   */
  hasOption(key) {
    return this.options.hasOwnProperty(key)
  }

  /**
   *
   * @param {string} key
   * @param {*} value
   * @returns {Day}
   */
  setOption(key, value) {
    this.options[key] = value
    return this
  }

  /**
   *
   * @param {string} key
   * @returns {*|null}
   */
  getOption(key) {
    return this.options[key] !== undefined ? this.options[key] : null
  }

  /**
   *
   * @returns {boolean}
   */
  get isBeforeNow() {
    return this.date.getTime() < startDateTime.getTime()
  }

  /**
   *
   * @returns {boolean}
   */
  get isAfterNow() {
    return this.date.getTime() > endDateTime.getTime()
  }

  /**
   *
   * @returns {boolean}
   */
  get isNow() {
    if (!this.enabled) {
      return false
    }
    if (startDateTime.getFullYear() !== this.date.getFullYear()) {
      return false
    }
    if (startDateTime.getMonth() !== this.date.getMonth()) {
      return false
    }
    return startDateTime.getDate() === this.date.getDate()
  }

  /**
   *
   * @returns {number}
   */
  get day() {
    return this.date.getDay()
  }

  /**
   *
   * @returns {number}
   */
  get number() {
    return this.date.getDate()
  }

  /**
   *
   * @returns {string}
   */
  getName(locale) {
    return objectPath.get(_lang, [locale, 'dayNames', this.day], null) ||
      objectPath.get(_lang, [DEFAULT_LOCALE, 'dayNames', this.day], null)
  }

  /**
   *
   * @returns {string}
   */
  getNameShort(locale) {
    return objectPath.get(_lang, [locale, 'dayNamesShort', this.day], null) ||
      objectPath.get(_lang, [DEFAULT_LOCALE, 'dayNamesShort', this.day], null)
  }
}

export default Day