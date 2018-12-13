
class PointPosition {
  /**
   *
   * @param {{lat: number, lng: number}} position
   */
  constructor(position) {
    /**
     * @type {number}
     */
    this.lat = position.lat || 0

    /**
     * @type {number}
     */
    this.lng = position.lng || 0
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