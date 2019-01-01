import Point from './Point'
let uKey = 0

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
     * @type {number}
     */
    this.uKey = ++uKey

    /**
     *
     * @type {Distance|?}
     */
    this.prevDistance = prevDistance

    /**
     *
     * @type {number}
     */
    this.number = distanceNumber

    /**
     * Time on distance.
     *
     * @type {number}
     */
    this.elapsedTime = 0

    /**
     * Length of distance.
     *
     * @type {number}
     */
    this.pathLength = 0

    /**
     *
     * @type {Array.<Point>}
     */
    this.points = []

    /**
     *
     * @type {Object}
     * @private
     */
    this._cache = {}
  }

  /**
   * Average speed for last 10 points.
   *
   * @returns {number}
   */
  get avgSpeed() {
    return this.getAvgSpeed(10)
  }

  /**
   * Average speed for (n) points.
   *
   * @param {number} pointsCount - Count points to calculate avg speed.
   */
  getAvgSpeed(pointsCount) {
    const key = `${pointsCount}-${this.points.length}`
    if (this._cache.hasOwnProperty(key)) {
      return this._cache[key]
    }
    const avg = { speed: 0, count: 0 }
    const points = this.findLastPoints(pointsCount)
    for (const point of points) {
      if (!point.prevPoint) {
        continue
      }
      avg.speed += point.speed
      avg.count++
    }

    this._cache[key] = avg.count > 0 ? avg.speed / avg.count : 0
    return this._cache[key]
  }

  /**
   * Find last points.
   *
   * @param {number} pointsCount - Count points to calculate avg speed.
   * @returns {Array}
   */
  findLastPoints(pointsCount) {
    let i = 0
    const len = this.points.length
    if (len >= pointsCount) {
      i = len - pointsCount
    }
    const points = []
    for (i; i < len; i++) {
      if (!this.points[i]) {
        break
      }
      points.push(this.points[i])
    }
    if (this.prevDistance && len < pointsCount) {
      const prevPoints = this.prevDistance.findLastPoints(pointsCount - len)
      return prevPoints.concat(points)
    }
    return points
  }

  /**
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
   *
   * @param {{lat: number, lng: number, elapsedTime: number}} value
   * @returns {Distance}
   */
  addPosition(value) {
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
    this.elapsedTime += point.time
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
      number: this.number,
      avgSpeed: this.avgSpeed,
      pathLength: this.pathLength,
      elapsedTime: this.elapsedTime,
      prevUKey: this.prevDistance ? this.prevDistance.uKey : null,
      points: this.points.map((point) => point.serialize())
    }
  }
}

export default Distance