import objectPath from 'object-path'

let warn = false

class BgMode {
  /**
   *
   * @param {boolean} [debug]
   */
  constructor(debug) {
    /**
     * @type {Object}
     */
    this.mode = objectPath.get(window, ['cordova', 'plugins', 'backgroundMode'], null)

    if (debug === true && !this.mode && !warn) {
      warn = true
      console.warn('BackgroundMode is not allowed')
    }
  }

  /**
   *
   * @param {boolean} value
   * @returns {BgMode}
   */
  enable(value) {
    if (this.mode) {
      this.mode.setEnabled(value)
      return this
    }
    return this
  }

  /**
   *
   * @returns {boolean}
   */
  isActive() {
    return this.mode ? this.mode.isActive() : false
  }

  /**
   *
   * @param {string} eventName - (enable, disable, activate, deactivate, failure)
   * @param {Function} callback
   * @returns {BgMode}
   */
  addEvent(eventName, callback) {
    if (this.mode) {
      this.mode.on(eventName, callback)
    }
    return this
  }

  /**
   *
   * @param {string} eventName - (enable, disable, activate, deactivate, failure)
   * @param {Function} callback
   * @returns {BgMode}
   */
  removeEvent(eventName, callback) {
    if (this.mode) {
      this.mode.un(eventName, callback)
    }
    return this
  }

  /**
   *
   * @returns {BgMode}
   */
  toForeground() {
    if (this.mode) {
      this.mode.moveToForeground()
    }
    return this
  }

  /**
   *
   * @returns {BgMode}
   */
  toBackground() {
    if (this.mode) {
      this.mode.moveToBackground()
    }
    return this
  }
}

export default BgMode