import objectPath from 'object-path'

class File {
  /**
   *
   * @param {boolean} [debug]
   */
  constructor(debug) {
    this.plugin = objectPath.get(window, ['cordova'], {})
  }

  /**
   *
   * @returns {boolean}
   */
  get isPluginEnabled() {
    return Boolean(this.plugin.base64ToGallery)
  }

  /**
   *
   * @param {string} base64Data
   * @param {Function} successCallback
   * @param {Function} errorCallback
   */
  write(base64Data, successCallback, errorCallback) {
    if (this.isPluginEnabled) {
      window.cordova.base64ToGallery(
        base64Data,
        {prefix: 'img_', mediaScanner: true},
        successCallback,
        errorCallback
      )
    } else {
      errorCallback(new Error('Plugin not found.'))
    }
  }
}

export default File