class PointPosition {
  /**
   *
   * @param {number} lat
   * @param {number} lng
   * @param {number|?} [time] - Default is Date.now()
   */
  constructor(lat, lng, time = null) {
    /**
     * @type {number}
     */
    this.lat = lat

    /**
     * @type {number}
     */
    this.lng = lng

    /**
     *
     * @type {number}
     */
    this.time = time || Date.now()
  }

  /**
   *
   * @returns {number}
   */
  get latitude() {
    return this.lat
  }

  /**
   *
   * @returns {number}
   */
  get longitude() {
    return this.lng
  }
}

export default PointPosition