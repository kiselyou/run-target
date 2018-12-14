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

    /**
     * Время пробешки. Значение таимера.
     *
     * @type {number}
     */
    this.time = 0
  }

  /**
   *
   * @param {number} value
   * @returns {Distance}
   */
  setTime(value) {
    this.time = value
    return this
  }

  /**
   * Скорость объекта на момент добавления точки.
   * Расчитывается между текущей точкой и предыдущей.
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
   * Средняя скорость объекта за последние (n) точек.
   *
   * @param {number} interval - Количество последних точек для расета средней скорости.
   */
  getAvgSpeed(interval) {
    const avg = { speed: 0, count: 0 }
    const index = this.points.length >= interval ? this.points.length - interval : 0
    for (let i = index; i < this.points.length; i++) {
      const speed = this.points[i]['speed']
      if (speed === 0) {
        continue
      }
      avg.speed += speed
      avg.count++
    }
    return avg.count > 0 ? avg.speed / avg.count : 0
  }

  /**
   * Средняя скорость на протяжении дистанции.
   *
   * @returns {number}
   */
  getAvgSpeedFull() {
    return this.getAvgSpeed(this.points.length)
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
   * @param {{lat: number, lng: number, [time]: number}} value
   * @returns {Distance}
   */
  addPosition(value) {
    this.addPoint(
      new Point(value, this.lastPoint)
        .setTime(this.time)
    )
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
      time: this.time,
      pathLength: this.pathLength,
      avgSpeed: this.getAvgSpeedFull(),
      distanceNumber: this.distanceNumber,
      prevDistanceUKey: this.prevDistance ? this.prevDistance.uKey : null,
      points: this.points.map((point) => point.serialize())
    }
  }
}

export default Distance