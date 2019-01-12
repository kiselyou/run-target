
class Emulator {
  constructor() {
    /**
     *
     * @type {string|?}
     */
    this.watchId = null

    /**
     *
     * @type {number}
     */
    this.startLat = 53.8925041

    /**
     *
     * @type {number}
     */
    this.startLng = 27.5728142

    /**
     * To emulate error set time. By default the emulator will not generate error.
     *
     * @type {number}
     */
    this.errorFromTime = 0

    /**
     *
     * @type {number}
     */
    this.interval = 1000

    /**
     *
     * @type {{min: number, max: number}}
     */
    this.accuracyRange = { min: 3, max: 30 }

    /**
     *
     * @type {boolean}
     */
    this.moveEnabled = true
  }

  /**
   *
   * @returns {boolean}
   */
  get isEmulator() {
    return true
  }

  /**
   *
   * @param {Function} successCallback
   * @param {Function} errorCallback
   * @param {Object} [options]
   * @returns {number}
   */
  watchPosition(successCallback, errorCallback, options) {
    let startTime = 0
    return setInterval(() => {
      if (this.errorFromTime > 0 && startTime > this.errorFromTime) {
        startTime = 0
        errorCallback(new Error('Emulate error'))
      } else {
        if (this.moveEnabled) {
          startTime += this.interval
          this.startLat += 0.00001529
          this.startLng += 0.00000959
          successCallback(this._getPosition())
        }
      }
    }, this.interval)
  }

  /**
   *
   * @param {number} watchId
   * @returns {Emulator}
   */
  clearWatch(watchId) {
    this._clearInterval(watchId)
    return this
  }

  /**
   *
   * @param {number} watchId
   * @returns {Emulator}
   * @private
   */
  _clearInterval(watchId) {
    clearInterval(watchId)
  }

  /**
   *
   * @returns {{ accuracy: number, altitude: number, latitude: number, longitude: number: time: number }}
   * @private
   */
  _getPosition() {
    const time = Date.now()
    return {
      accuracy: this._getAccuracy(),
      altitude: 225,
      latitude: this.startLat,
      longitude: this.startLng,
      time: time - (time % 1000)
    }
  }

  /**
   *
   * @returns {Emulator}
   */
  stopMove() {
    this.moveEnabled = false
    return this
  }

  /**
   *
   * @returns {Emulator}
   */
  startMove() {
    this.moveEnabled = true
    return this
  }

  /**
   *
   * @returns {number}
   * @private
   */
  _getAccuracy() {
    const max = this.accuracyRange.max - this.accuracyRange.min
    return Math.floor(Math.random() * max) + this.accuracyRange.min
  }
}

export default Emulator