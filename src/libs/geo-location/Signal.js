
class Signal {
  constructor() {
    /**
     * The value from 0 to 100. Then more value then better.
     *
     * @type {number}
     */
    this.value = 0

    /**
     *
     * @type {number}
     */
    this.code = 0

    /**
     *
     * @type {string}
     */
    this.message = 'Success'

    this.accuracyPercent = [
      [100, 0, 4],
      [70, 4, 10],
      [50, 10, 24],
      [20, 24, 40],
      [0, 40, Infinity]
    ]
  }

  /**
   *
   * @param {Function} [callback]
   * @returns {Promise<Signal>}
   */
  listen(callback) {
    navigator.geolocation.watchPosition(
      (position) => {
        const accuracy = position['coords']['accuracy']
        for (const item of this.accuracyPercent) {
          if (accuracy >= item[1] && accuracy < item[2]) {
            this.value = item[0]
            this.code = Signal.SUCCESS
            this.message = 'Success'
            if (callback) {
              callback(this.value)
            }
            return
          }
        }
      },
      (error) => {
        this.value = 0
        this.message = error.message
        switch (error.code) {
          case error.PERMISSION_DENIED:
            this.code = Signal.PERMISSION_DENIED
            break
          case error.POSITION_UNAVAILABLE:
            this.code = Signal.POSITION_UNAVAILABLE
            break
          case error.TIMEOUT:
            this.code = Signal.TIMEOUT
            break
          default:
            this.code = Signal.UNKNOWN
            break
        }
        if (callback) {
          callback(0)
        }
      },
      { enableHighAccuracy: true, timeout: 3000 }
    )
  }

  /**
   *
   * @returns {boolean}
   */
  get isGeoDisabled() {
    return this.code === Signal.PERMISSION_DENIED
  }

  /**
   *
   * @returns {number}
   */
  static get SUCCESS() {
    return 0
  }

  /**
   *
   * @returns {number}
   */
  static get PERMISSION_DENIED() {
    return 1
  }

  /**
   *
   * @returns {number}
   */
  static get POSITION_UNAVAILABLE() {
    return 2
  }

  /**
   *
   * @returns {number}
   */
  static get TIMEOUT() {
    return 3
  }

  /**
   *
   * @returns {number}
   */
  static get UNKNOWN() {
    return 4
  }
}

export default Signal