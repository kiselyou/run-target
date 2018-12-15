
class PointPosition {
  /**
   *
   * @param {{lat: number, lng: number, time: number}} position
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

    /**
     *
     * @type {number}
     */
    this.timestamp = position.time || Date.now()

    this.originSpeed = position.originSpeed
    this.originTime = position.originTime
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