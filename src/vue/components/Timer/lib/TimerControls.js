
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
    let days = 0
    if (this.time >= DAY) {
      days = Math.round(this.time / DAY)
    }

    const remainingDays = Math.round(this.time - (days * DAY))

    let hours = Math.round(remainingDays / HOUR)
    if (hours >= 24) {
      hours = 23
    }

    const remainingHours = Math.round(remainingDays - (hours * HOUR))

    let minutes = Math.round(remainingHours / 60)
    if (minutes >= 60) {
      minutes = 59
    }

    const remainingMinutes = Math.round(remainingHours - (minutes * 60))
    let seconds = Math.round(remainingMinutes / 60)

    console.log(remainingMinutes, seconds)
    return { days, hours, minutes, seconds }
  }

  /**
   *
   * @returns {string}
   */
  toStringHours() {
    const time = this.getTimeObject()
    const d = ('0' + time.hours).slice(-2)
    const h = ('0' + time.hours).slice(-2)
    const m = ('0' + time.minutes).slice(-2)
    const s = ('0' + time.seconds).slice(-2)
    return `${d}:${h}:${m}:${s}`
  }
}

export default TimerControls