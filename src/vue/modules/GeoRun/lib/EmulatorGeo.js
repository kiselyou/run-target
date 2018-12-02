import Geo from './Geo'

class EmulatorGeo extends Geo {
  /**
   *
   * @param {number} [timeInterval]
   */
  constructor(timeInterval = 1000) {
    super()

    /**
     *
     * @type {number}
     */
    this.timeInterval = timeInterval

    /**
     *
     * @type {null}
     */
    this.intervalId = null

    /**
     *
     * @type {{timestamp: number, coords: {latitude: number, longitude: number}}}
     */
    this.startOptions = {
      timestamp: 1542662430374,
      coords: {
        latitude: 55.456000,
        longitude: 27.567000
      }
    }
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  tick() {
    this.startOptions.coords.latitude += 0.0000195
    this.startOptions.coords.longitude += 0.0000217
    this.addPosition({
      timestamp: Date.now(),
      coords: {
        latitude: this.startOptions.coords.latitude,
        longitude: this.startOptions.coords.longitude
      }
    })
    return this
  }

  /**
   *
   * @param {onSuccessCallback} onSuccess
   * @param {onErrorCallback} onError
   * @returns {EmulatorGeo}
   */
  start(onSuccess, onError) {
    clearInterval(this.intervalId)
    this.intervalId = setInterval(() => this.tick(), this.timeInterval)
    onSuccess()
    return this
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  stop() {
    clearInterval(this.intervalId)
    return this
  }
}

export default EmulatorGeo