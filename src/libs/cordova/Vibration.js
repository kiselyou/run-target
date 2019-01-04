import objectPath from "object-path";

class Vibration {
  /**
   *
   * @param {boolean} [debug]
   */
  constructor(debug) {
    /**
     * @type {Object|?}
     */
    this.plugin = objectPath.get(window, ['navigator'], null)
  }

  call(time) {
    if (this.plugin && this.plugin.vibrate) {
      this.plugin.vibrate(time)
    }
  }
}

export default Vibration