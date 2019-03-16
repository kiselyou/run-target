
class PointPosition {
  /**
   *
   * @param {Object} [position]
   */
  constructor(position) {
    /**
     *
     * @type {Array}
     */
    this.store = []
    if (position) {
      this.store.push(position['time'])
      this.store.push(position['latitude'])
      this.store.push(position['longitude'])
      this.store.push(position['accuracy'])
      this.store.push(position['altitude'])
      this.store.push(position['pauseTime'] || 0)
      this.store.push(position['hrm'])
    }
  }

  /**
   *
   * @returns {Array}
   */
  asArray() {
    return this.store
  }

  /**
   *
   * @param {Array} value
   * @returns {PointPosition}
   */
  fromArray(value) {
    if (value.length !== 6) {
      throw new Error(`Expected seven items but got ${value.length} in method "fromArray"`)
    }
    this.store = value
    return this
  }

  /**
   *
   * @returns {string}
   */
  toJSON() {
    return JSON.stringify(this.store)
  }

  /**
   *
   * @param {string} str
   * @returns {PointPosition}
   */
  fromJSON(str) {
    this.fromArray(JSON.parse(str))
    return this
  }

  /**
   *
   * @returns {number|?}
   */
  get time() {
    return this.store[0] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get latitude() {
    return this.store[1] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get longitude() {
    return this.store[2] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get accuracy() {
    return this.store[3] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get altitude() {
    return this.store[4] || null
  }

  /**
   *
   * @returns {number}
   */
  get pauseTime() {
    return this.store[5] || 0
  }

  /**
   *
   * @returns {number}
   */
  get hrm() {
    return this.store[6] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get lat() {
    return this.latitude
  }

  /**
   *
   * @returns {number|?}
   */
  get lng() {
    return this.longitude
  }
}

export default PointPosition