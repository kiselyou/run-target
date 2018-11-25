
const HOUR = 60 * 60
const DAY = 24 * HOUR

class TimerControls {
  constructor() {
    /**
     *
     * @type {string|?}
     */
    this.id = null

    /**
     *
     * @type {Array.<tickCallback>}
     */
    this.tickCallbacks = []

    /**
     *
     * @type {boolean}
     */
    this.enabled = false

    /**
     *
     * @type {number}
     */
    this.time = 0
  }

  /**
   * @param {string} timeStr
   * @param {number} time - Time in seconds
   * @callback tickCallback
   */

  /**
   *
   * @param {tickCallback} callback
   * @returns {TimerControls}
   */
  tick(callback) {
    this.tickCallbacks.push(callback)
    return this
  }

  /**
   *
   * @returns {TimerControls}
   */
  start() {
    this.stop()
    this.enabled = true
    this.id = setInterval(() => {
      this.time++
      for (const callback of this.tickCallbacks) {
        callback(this.toString(), this.time)
      }
    }, 1000)
    return this
  }

  /**
   *
   * @returns {TimerControls}
   */
  stop() {
    clearInterval(this.id)
    return this
  }

  /**
   *
   * @returns {TimerControls}
   */
  clear() {
    this.stop()
    this.time = 0
    return this
  }

  /**
   *
   * @returns {TimerControls}
   */
  end() {
    this.clear()
    this.enabled = false
    return this
  }

  /**
   *
   * @returns {{days: number, hours: number, minutes: number, seconds: number}}
   */
  getTimeObject() {
    let days = Math.floor(this.time / DAY)
    const remainingDays = this.time - (days * DAY)
    let hours =  Math.floor(remainingDays / HOUR)
    if (hours >= 24) {
      hours = 23
    }
    const remainingHours = remainingDays - (hours * HOUR)
    let minutes = Math.floor(remainingHours / 60)
    if (minutes >= 60) {
      minutes = 59
    }
    const seconds = Math.floor(remainingHours - (minutes * 60))
    return { days, hours, minutes, seconds }
  }

  /**
   *
   * @returns {string}
   */
  toStringHours() {
    const time = this.getTimeObject()
    const h = this.numberToString(time.hours)
    const m = this.numberToString(time.minutes)
    const s = this.numberToString(time.seconds)
    return `${h}:${m}:${s}`
  }

  /**
   *
   * @returns {string}
   */
  toStringDays() {
    const time = this.getTimeObject()
    const d = this.numberToString(time.days)
    const h = this.numberToString(time.hours)
    const m = this.numberToString(time.minutes)
    const s = this.numberToString(time.seconds)
    return `${d}:${h}:${m}:${s}`
  }

  /**
   *
   * @param {Number} value
   * @returns {string}
   */
  numberToString(value) {
    return ('0' + value).slice(-2)
  }
}

export default TimerControls