

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

    /**
     *
     * @type {boolean}
     * @private
     */
    this._pause = false
  }

  /**
   *
   * @returns {Promise<Signal>}
   */
  detectSignal() {
    let time = Date.now()
    const timeout = 3000
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        () => {
          const timeDiff = Date.now() - time
          this.value = 100 - (timeDiff * 100 / timeout)
          this.code = Signal.SUCCESS
          this.message = 'Success'
          resolve(this)
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
          resolve(this)
        },
        { enableHighAccuracy: true, timeout }
      );
    })
  }

  /**
   * @param {Signal} signal
   * @callback signalCallback
   */

  /**
   *
   * @param {signalCallback} [callback]
   */
  listen(callback) {
    if (this._pause) {
      setTimeout(() => this.listen(callback), 2000)
      return
    }
    this.detectSignal().then((signal) => {
      if (callback) {
        callback(signal)
      }
      setTimeout(() => this.listen(callback), 2000)
    })
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