import objectPath from 'object-path'

class Diagnostic {
  /**
   *
   * @param {boolean} [debug]
   */
  constructor(debug) {
    /**
     * @type {Object}
     */
    this.diagnostic = objectPath.get(window, ['cordova', 'plugins', 'diagnostic'], null)
  }

  isGpsLocationEnabled(successCallback, errorCallback) {
    if (this.diagnostic) {
      this.diagnostic.isGpsLocationEnabled(successCallback, errorCallback)
      return
    }
    errorCallback(new Error('Plugin diagnostic not found.'))
  }

  switchToLocationSettings() {
    if (this.diagnostic) {
      this.diagnostic.switchToLocationSettings()
    }
  }
}

export default Diagnostic