import Point from "@vue/GeoRun/lib/Point";

class Distance {
  /**
   *
   * @param {number} distanceNumber
   * @param {Distance|?} [prevDistance]
   */
  constructor(distanceNumber, prevDistance = null) {
    /**
     *
     * @type {number}
     */
    this.distanceNumber = distanceNumber

    /**
     *
     * @type {Distance|?}
     */
    this.prevDistance = prevDistance

    /**
     *
     * @type {Array.<Point>}
     */
    this.points = []

    /**
     *
     * @type {number}
     */
    this.speed = 0

    /**
     *
     * @type {number}
     */
    this.distance = 0

    /**
     *
     * @type {number}
     */
    this.totalDistance = 0
  }

  /**
   *
   * @returns {number}
   */
  get averageSpeed() {
    let total = 0
    for (const point of this.points) {
      total += point.speed
    }
    return this.points.length ? total / this.points.length : 0
  }

  /**
   *
   * @returns {Point|?}
   */
  get lastPoint() {
    if (this.points.length > 0) {
      return this.points[this.points.length - 1]
    }

    if (this.prevDistance instanceof Distance) {
      return this.prevDistance.lastPoint
    }

    return null
  }

  /**
   * @param {Point} point
   * @callback afterPointAdded
   */

  /**
   *
   * @param {Object} value
   * @param {afterPointAdded} [callback]
   * @returns {Distance}
   */
  addPosition(value, callback) {
    this.addPoint(new Point(value, this.lastPoint))
    return this
  }

  /**
   *
   * @param {Point} point
   * @returns {Distance}
   */
  addPoint(point) {
    this.speed = point.speed
    this.distance = point.distance
    this.totalDistance += this.distance
    this.points.push(point)
    return this
  }
}

export default Distance