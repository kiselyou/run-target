
const HOUR = 60 * 60
const DAY = 24 * HOUR

class Timer {
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
     * @type {{time: number, tickTime: number}}
     */
    this.cache = { time: 0, tickTime: 0 }

    /**
     * 
     * @type {boolean}
     */
    this.pause = false
  }

  /**
   * Time in milliseconds.
   *
   * @returns {number}
   */
  get time() {
    const timestamp = (Date.now() - this.cache.tickTime) / 1000
    if (timestamp > 0 && timestamp < 1) {
      return this.cache.time + timestamp
    }
    return this.cache.time
  }

  /**
   *
   * @param {number} value
   * @returns {Timer}
   */
  setTime(value) {
    this.cache.time = value
    return this
  }

  /**
   * @param {number} time - Time in seconds
   * @param {string} timeStr
   * @callback tickCallback
   */

  /**
   *
   * @param {tickCallback} callback
   * @returns {Timer}
   */
  tick(callback) {
    this.tickCallbacks.push(callback)
    return this
  }

  /**
   *
   * @returns {Timer}
   */
  start() {
    this.pause = false
    this.cache.tickTime = Date.now()
    if (this.id) {
      return this
    }

    this.id = setInterval(() => {
      if (!this.pause) {
        const now = Date.now()
        this.cache.time += (now - this.cache.tickTime) / 1000
        this.cache.tickTime = now
        for (const callback of this.tickCallbacks) {
          callback(this.time)
        }
      }

    }, 1000)
    return this
  }

  /**
   *
   * @returns {Timer}
   */
  stop() {
    this.pause = true
    return this
  }

  /**
   *
   * @returns {Timer}
   */
  clear() {
    clearInterval(this.id)
    this.id = null
    this.pause = false
    this.cache.time = 0
    this.cache.tickTime = 0
    return this
  }

  /**
   *
   * @returns {Timer}
   */
  end() {
    this.clear()
    return this
  }

  /**
   *
   * @returns {{days: number, hours: number, minutes: number, seconds: number}}
   */
  getTimeObject() {
    let days = Math.floor(this.cache.time / DAY)
    const remainingDays = this.cache.time - (days * DAY)
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
   * @returns {number}
   */
  toNumberMinutes() {
    const time = this.getTimeObject()
    const minutes = (time.days * 24 * 60) + (time.hours * 60) + time.minutes
    return minutes + (time.seconds / 100)
  }

  /**
   *
   * @returns {string}
   */
  toStringMinutes() {
    const time = this.getTimeObject()
    const m = this.numberToString((time.days * 24 * 60) + (time.hours * 60) + time.minutes)
    const s = this.numberToString(time.seconds)
    return `${m}'${s}'`
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

export default Timer