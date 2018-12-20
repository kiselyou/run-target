import Geo from './Geo'

class EmulatorGeo extends Geo {
  constructor() {
    super()

    /**
     *
     * @type {boolean}
     */
    this.emulator = true

    /**
     *
     * @type {null}
     */
    this.intervalId = null
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  tick() {
    const startPoint = { lat: 0, lng: 0 }
    const distance = this.getCurrentDistance()

    this.addPosition({
      lat: distance ? distance.lastPoint.position.lat + 0.0000195 : startPoint.lat,
      lng: distance ? distance.lastPoint.position.lng + 0.0000217 : startPoint.lng,
      elapsedTime: this.timer.time,
      time: Date.now(),
      coordsSpeed: 0,
      coordsTime: 0,
    })
    return this
  }

  /**
   *
   * @param {onErrorCallback} onError
   * @returns {EmulatorGeo}
   */
  start(onError) {
    if (this.intervalId) {
      return this
    }

    this.timer.start()
    this.intervalId = setInterval(() => {
      this.tick()
    }, 1000)
    return this
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  stop() {
    this.timer.stop()
    clearInterval(this.intervalId)
    this.intervalId = null
    return this
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  clear() {
    super.clear()
    clearInterval(this.intervalId)
    this.intervalId = null
    return this
  }
}

export default EmulatorGeo