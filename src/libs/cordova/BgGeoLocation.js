import objectPath from "object-path";
let warn = false

class BgGeoLocation {
  /**
   *
   * @param {boolean} [debug]
   */
  constructor(debug) {
    /**
     * @type {Object}
     */
    this.plugin = objectPath.get(window, 'BackgroundGeolocation', null)

    /**
     *
     * @type {Array}
     */
    this.watchPositionEvents = []

    /**
     *
     * @type {boolean}
     */
    this.debug = debug

    if (debug === true && !this.plugin && !warn) {
      warn = true
      console.warn('Plugin BackgroundGeolocation not found')
    }
  }

  /**
   *
   * @param {Object} options
   * @returns {Object}
   * @private
   */
  _prepareDefaultOptions(options) {
    if (this.plugin) {
      return {
        locationProvider: this.plugin.ACTIVITY_PROVIDER,
        desiredAccuracy: this.plugin.HIGH_ACCURACY,
        distanceFilter: 10,
        notificationTitle: 'Background tracking',
        notificationText: 'enabled',
        interval: 2000,
        fastestInterval: 1000,
        activitiesInterval: 2000,
        debug: this.debug
      }
    }
    return Object.assign({ enableHighAccuracy: true, timeout: 60000, maximumAge: 0 }, options)
  }

  /**
   * @param {{ accuracy: number, altitude: number, latitude: number, longitude: number: time: number }} position
   * @callback watchPositionSuccess
   */

  /**
   *
   * @param {watchPositionSuccess} successCallback
   * @param {Function} errorCallback
   * @param {Object} [options]
   * @returns {number}
   */
  watchPosition(successCallback, errorCallback, options = {}) {
    options = this._prepareDefaultOptions(options);
    if (this.plugin) {
      this.plugin.configure(options)
      const location = this.plugin.on('location', (location) => {
        successCallback({
          accuracy: location.accuracy,
          altitude: location.altitude,
          latitude: location.latitude,
          longitude: location.longitude,
          time: location.time
        })
      })
      this.plugin.on('error', (error) => {
        errorCallback(error)
      })
      this.plugin.start()
      this.watchPositionEvents.push(location)
      return this.watchPositionEvents.length - 1
    }

    return navigator.geolocation.watchPosition(
      (position) => {
        return {
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          time: Date.now()
        }
      },
      errorCallback,
      options
    )
  }

  /**
   *
   * @param {number} watchId
   */
  clearWatch(watchId) {
    if (this.plugin) {
      this.plugin.stop()
      if (this.watchPositionEvents[watchId]) {
        this.watchPositionEvents[watchId].remove()
        this.watchPositionEvents.splice(watchId, 1)
      }
      if (this.watchPositionEvents.length === 0) {
        this.plugin.stop()
      }
      return
    }
    navigator.geolocation.clearWatch(watchId)
  }
}

export default BgGeoLocation