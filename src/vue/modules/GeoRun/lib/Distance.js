import Point from './Point'
import uuid from 'uuid/v4'

class Distance {
  /**
   *
   * @param {number} distanceNumber
   * @param {Distance|?} [prevDistance]
   */
  constructor(distanceNumber, prevDistance = null) {
    /**
     *
     * @type {number|?}
     */
    this.id = null

    /**
     * @type {string}
     */
    this.uKey = uuid()

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
     * Текущая длина дистанции.
     *
     * @type {number}
     */
    this.pathLength = 0
  }

  /**
   * Скорость объекта на момент добавления точки.
   *
   * @returns {number}
   */
  get speed() {
    const point = this.lastPoint
    if (point) {
      return point.speed
    }
    return 0
  }

  /**
   * Средняя скорость на протяжении дистанции.
   *
   * @returns {number}
   */
  get averageSpeed() {
    let totalSpeed = 0
    let totalCount = 0
    for (const point of this.points) {
      if (!point.prevPoint) {
        continue
      }
      totalSpeed += point.speed
      totalCount++
    }
    return totalCount ? totalSpeed / totalCount : 0
  }

  /**
   * Последняя точка.
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
    this.pathLength += point.distance
    this.points.push(point)
    return this
  }

  /**
   *
   * @param {string} key
   * @returns {Point|?}
   */
  findPointByKey(key) {
    for (let i = this.points.length; i > 0; i--) {
      if (this.points[i]['key'] === key) {
        return this.points[i]
      }
    }

    if (this.prevDistance) {
      this.prevDistance.findPointByKey(key)
    }
    return null
  }

  /**
   *
   * @returns {Object}
   */
  serialize() {
    return {
      id: this.id,
      uKey: this.uKey,
      pathLength: this.pathLength,
      distanceNumber: this.distanceNumber,
      prevDistanceUKey: this.prevDistance ? this.prevDistance.uKey : null,
      points: this.points.map((point) => point.serialize())
    }
  }
}

export default Distance