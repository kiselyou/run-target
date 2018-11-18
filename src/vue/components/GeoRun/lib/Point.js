import { getDistance } from 'geolib'

class Point {
  /**
   *
   * @param {Object} position
   * @param {Point|?} [prevPoint]
   */
  constructor(position, prevPoint = null) {
    /**
     *
     * @type {Object}
     */
    this.position = position

    /**
     *
     * @type {Point|?}
     */
    this.prevPoint = prevPoint
  }

  /**
   *
   * @returns {number}
   */
  get latitude() {
    return this.position.coords.latitude
  }

  /**
   *
   * @returns {number}
   */
  get longitude() {
    return this.position.coords.longitude
  }

  /**
   * Calculates the distance between current and previous geo coordinates.
   * Return value is always float and represents the distance in meters.
   *
   * @returns {number}
   */
  get distance() {
    if (this.prevPoint instanceof Point) {
      return getDistance(
        {
          latitude:  this.prevPoint.latitude,
          longitude:  this.prevPoint.longitude
        },
        {
          latitude:  this.latitude,
          longitude:  this.longitude
      })
    }
    return 0
  }
}

export default Point