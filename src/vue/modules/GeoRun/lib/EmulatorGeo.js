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
     * @type {{lat: number, lng: number}}
     */
    this.startOptions = { lat: 55.456000, lng: 27.567000 }
  }

  /**
   *
   * @returns {EmulatorGeo}
   */
  tick() {
    this.startOptions.lat += 0.0000195
    this.startOptions.lng += 0.0000217
    this.addPosition({
      lat: this.startOptions.lat,
      lng: this.startOptions.lng
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