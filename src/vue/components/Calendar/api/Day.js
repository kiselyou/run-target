import { _lang, DEFAULT_LOCALE } from './_lang'
import objectPath from 'object-path'

const startDateTime = new Date()
startDateTime.setHours(0, 0, 0, 0)
const endDateTime = new Date()
endDateTime.setHours(23, 59, 59, 999)

class Day {
  /**
   *
   * @param {Date} date
   * @param {boolean} enabled
   */
  constructor(date, enabled) {
    /**
     * @type {number|?}
     */
    this.id = null

    /**
     *
     * @type {Date}
     */
    this.date = new Date(date)
    this.date.setHours(0, 0, 0, 0)

    /**
     *
     * @type {boolean}
     */
    this.enabled = enabled

    /**
     *
     * @type {boolean}
     */
    this.active = false

    /**
     * Custom options.
     *
     * @type {Object}
     */
    this.options = {}
  }

  /**
   *
   * @param {number} value
   * @returns {Day}
   */
  setId(value) {
    this.id = value
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {Day}
   */
  setActive(value) {
    this.active = value
    return this
  }

  /**
   *
   * @param {Day|Object} day
   * @returns {Day}
   */
  copy(day) {
    for (const property in day) {
      if (!day.hasOwnProperty(property) || !this.hasOwnProperty(property)) {
        continue
      }
      if (typeof this[property] === 'object') {
        this[property] = Object.assign({}, day[property])
      } else {
        this[property] = day[property]
      }
    }
    return this
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
   * @param {Object} value
   * @returns {Day}
   */
  setOption(value) {
    this.options = value
    return this
  }

  /**
   *
   * @param {string} key
   * @param {*} value
   * @returns {Day}
   */
  addOption(key, value) {
    this.options[key] = value
    return this
  }

  /**
   *
   * @param {string} key
   * @param {*} value
   * @returns {Day}
   */
  pushOption(key, value) {
    const option = (this.options[key] || [])
    if (Array.isArray(option)) {
      option.push(value)
      this.addOption(key, option)
    } else {
      throw Error('Method "pushOption" work only with array type option.')
    }
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
   * @param {string} key
   * @returns {number}
   */
  getNumberOption(key) {
    return this.options[key] || 0
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