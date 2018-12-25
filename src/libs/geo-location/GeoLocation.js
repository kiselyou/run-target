import Emulator from './Emulator'

class GeoLocation {
  /**
   * @param {boolean} [emulator]
   */
  constructor(emulator = false) {

    /**
     *
     * @type {number|?}
     * @private
     */
    this._watchID = null

    /**
     *
     * @type {number}
     * @private
     */
    this._status = GeoLocation.STATUS_DISABLED

    /**
     *
     * @type {{desiredAccuracy: number, totalEventCount: number}}
     * @private
     */
    this._tickOptions = { desiredAccuracy: 8, totalEventCount: 0 }

    /**
     *
     * @type {{enableHighAccuracy: boolean, timeout: number, maximumAge: number}}
     * @private
     */
    this._positionOptions = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }

    /**
     *
     * @type {{onTick: Array, onError: Array}}
     * @private
     */
    this._eventListeners = { onTick: [], onError: [] }

    /**
     *
     * @type {Emulator}
     */
    this.geo = emulator ? new Emulator() : navigator.geolocation
  }

  /**
   *
   * @param {{ [interval]: number, [accuracyRangeMin]: number, [accuracyRangeMax]: number }} options
   * @returns {GeoLocation}
   */
  emulatorOptions(options) {
    this.geo.interval = options.interval || this.geo.interval
    this.geo.accuracyRange.min = options.accuracyRangeMin || this.geo.accuracyRange.min
    this.geo.accuracyRange.max = options.accuracyRangeMax || this.geo.accuracyRange.max
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {GeoLocation}
   */
  setDesiredAccuracy(value) {
    this._tickOptions.desiredAccuracy = value
    return this
  }

  /**
   *
   * @param position
   * @private
   */
  _tick(position) {
    this._tickOptions.totalEventCount++
    if (this._status === GeoLocation.STATUS_PAUSED) {
      return
    }
    // Ignore the first event unless it's the only one received because some devices seem to send a cached location even when maxaimumAge is set to zero.
    if (this._tickOptions.totalEventCount === 1) {
      return
    }

    if (position.coords.accuracy <= this._tickOptions.desiredAccuracy) {
      position.timestamp = Date.now()
      for (const callback of this._eventListeners.onTick) {
        callback(position)
      }
    }
  }

  /**
   *
   * @param error
   * @private
   */
  _error(error) {
    for (const callback of this._eventListeners.onError) {
      callback(error)
    }
  }

  /**
   *
   * @param {string} eventName
   * @param {Function} callback
   * @returns {GeoLocation}
   */
  addEventListener(eventName, callback) {
    switch (eventName) {
      case 'onTick':
        this._eventListeners.onTick.push(callback)
        break
      case 'onError':
        this._eventListeners.onError.push(callback)
        break
    }
    return this
  }

  /**
   *
   * @returns {GeoLocation}
   */
  start() {
    switch (this._status) {
      case GeoLocation.STATUS_DISABLED:
        this._status = GeoLocation.STATUS_PROCESS
        break
      case GeoLocation.STATUS_PAUSED:
        this._status = GeoLocation.STATUS_PROCESS
        if (this.geo.isEmulator) {
          this.geo.startMove()
        }
        return this
      default:
        return this
    }
    this._watchID = this.geo.watchPosition(
      (position) => this._tick(position),
      (error) => this._error(error),
      this._positionOptions
    )
    return this
  }

  /**
   *
   * @returns {GeoLocation}
   */
  pause() {
    this._status = GeoLocation.STATUS_PAUSED
    if (this.geo.isEmulator) {
      this.geo.stopMove()
    }
    return this
  }

  /**
   *
   * @returns {GeoLocation}
   */
  stop() {
    this._status = GeoLocation.STATUS_DISABLED
    this.geo.clearWatch(this._watchID)
    return this
  }

  /**
   *
   * @returns {number}
   */
  static get STATUS_PROCESS() {
    return 1
  }

  /**
   *
   * @returns {number}
   */
  static get STATUS_PAUSED() {
    return 2
  }

  /**
   *
   * @returns {number}
   */
  static get STATUS_DISABLED() {
    return 0
  }
}

export default GeoLocation