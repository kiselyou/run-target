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
      console.warn('Plugin BackgroundMode not found')
    }
  }

  /**
   * Various APIs like playing media or tracking GPS position in background might not work while in background even the background mode is active.
   * To fix such issues the plugin provides a method to disable most optimizations done by Android/CrossWalk.
   *
   * @returns {BgMode}
   */
  disableWebViewOptimizations() {
    if (this.mode) {
      this.mode.disableWebViewOptimizations()
    }
    return this
  }

  /**
   * Override the back button on Android to go to background instead of closing the app.
   *
   * @returns {BgMode}
   */
  overrideBackButton() {
    if (this.mode) {
      this.mode.overrideBackButton()
    }
    return this
  }

  /**
   *
   * @returns {BgMode}
   */
  enable() {
    if (this.mode) {
      this.mode.enable()
    }
    return this
  }

  /**
   *
   * @returns {BgMode}
   */
  disable() {
    if (this.mode) {
      this.mode.disable()
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
  moveToForeground() {
    if (this.mode) {
      this.mode.moveToForeground()
    }
    return this
  }

  /**
   *
   * @returns {BgMode}
   */
  moveToBackground() {
    if (this.mode) {
      this.mode.moveToBackground()
    }
    return this
  }

  /**
   * A wake-up turns on the screen while unlocking moves the app to foreground even the device is locked.
   * Turn screen on
   *
   * @returns {BgMode}
   */
  wakeUp() {
    if (this.mode) {
      this.mode.wakeUp()
    }
    return this
  }

  /**
   * A wake-up turns on the screen while unlocking moves the app to foreground even the device is locked.
   * Turn screen on and show app even locked
   *
   * @returns {BgMode}
   */
  unlock() {
    if (this.mode) {
      this.mode.unlock()
    }
    return this
  }
}

export default BgMode