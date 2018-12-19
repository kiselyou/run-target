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
     * @type {number}
     */
    this.number = distanceNumber

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
     * Общее время дистанции. сек.
     *
     * @type {number}
     */
    this.time = 0

    /**
     * Истекшее время. сек.
     *
     * @type {number}
     */
    this.elapsedTime = 0

    /**
     * Длина текущей дистанции.
     *
     * @type {number}
     */
    this.pathLength = 0

    /**
     * Скорость объекта между двумя последнии точками.
     *
     * @type {number}
     */
    this.speed = 0
    /**
     *
     * @type {{ speed: number, count: number }}
     * @private
     */
    this._avgSpeed = { speed: 0, count: 0 }
  }

  /**
   * Средняя скорость на протяжении дистанции.
   *
   * @returns {number}
   */
  get avgSpeed() {
    const speedAvg = this._avgSpeed.speed
    const countAvg = this._avgSpeed.count
    return countAvg > 0 ? speedAvg / countAvg : 0
  }

  /**
   * Средняя скорость объекта за последние (n) точек.
   *
   * @param {number} pointsCount - Количество последних точек для расета средней скорости.
   */
  getAvgSpeedByLastPoints(pointsCount) {
    const avg = { speed: 0, count: 0 }
    const index = this.points.length >= pointsCount ? this.points.length - pointsCount : 0
    for (let i = index; i < this.points.length; i++) {
      const point = this.points[i]
      if (!point.prevPoint) {
        continue
      }
      avg.speed += point.speed
      avg.count++
    }
    return avg.count > 0 ? avg.speed / avg.count : 0
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
    this.time += point.time
    this.pathLength += point.distance
    this.elapsedTime = point.position.elapsedTime
    if (point.prevPoint) {
      this._avgSpeed.count++
      this._avgSpeed.speed += point.speed
    }
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
      time: this.time,
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