import { getDistance } from 'geolib'
import PointPosition from './PointPosition'
let uKey = 0

class Point {
  /**
   *
   * @param {{lat: number, lng: number, elapsedTime: number}} position
   * @param {Point|?} [prevPoint]
   */
  constructor(position, prevPoint = null) {
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
     * @type {PointPosition}
     */
    this.position = new PointPosition(position)

    /**
     *
     * @type {Point|?}
     */
    this.prevPoint = prevPoint

    /**
     *
     * @type {number|?}
     */
    this.time = this.getTime()

    /**
     *
     * @type {number}
     */
    this.speed = this.getSpeed()

    /**
     *
     * @type {number|?}
     */
    this.distance = this.getDistance()
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
      speed: this.speed,
      distance: this.distance,
      position: this.position,
      prevUKey: this.prevPoint ? this.prevPoint.uKey : null,
    }
  }

  /**
   *
   *
   * @returns {number}
   */
  getDistance() {
    return this.prevPoint ? this.calculateDistance(this, this.prevPoint) : 0
  }

  /**
   * Скорость с момента получения последней точки.
   *
   * @returns {number}
   */
  getSpeed() {
    return this.prevPoint ? this.calculateSpeed(this, this.prevPoint) : 0
  }

  /**
   * Количество секунд с момента получения последней точки.
   *
   * @returns {number}
   */
  getTime() {
    return this.calculateTime(this, this.prevPoint || null)
  }

  /**
   * Calculates the speed between current and previous geo coordinates.
   *
   * @param {Point} point
   * @param {Point} prevPoint
   * @param {number} [measures]
   * @returns {number}
   */
  calculateSpeed(point, prevPoint, measures = 0.001) {
    const time = this.calculateTime(point, prevPoint)
    if (time === 0) {
      return 0
    }
    const distance = this.calculateDistance(point, prevPoint)
    const mPerHr = (distance / time) * 3600
    return Math.round(mPerHr * measures * 10000) / 10000
  }

  /**
   * Calculates the distance between current and previous geo coordinates.
   * Return value is always float and represents the distance in meters.
   *
   * @param {Point} point
   * @param {Point} prevPoint
   * @returns {number}
   */
  calculateDistance(point, prevPoint) {
    return getDistance(prevPoint.position, point.position, 6, 6)
  }

  /**
   * Calculates the time in seconds between current and previous geo coordinates.
   *
   * @param {Point} point
   * @param {Point} prevPoint
   * @returns {number}
   */
  calculateTime(point, prevPoint) {
    if (prevPoint) {
      return point.position.elapsedTime - prevPoint.position.elapsedTime
    }
    return point.position.elapsedTime
  }
}

export default Point