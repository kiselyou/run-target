import { getDistance } from 'geolib'
import PointPosition from './PointPosition'
let uKey = 0

class Point {
  /**
   *
   * @param {Object} position
   * @param {Point|?} prevPoint
   */
  constructor(position, prevPoint) {
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
     * @type {Point|?}
     */
    this.prevPoint = prevPoint

    /**
     *
     * @type {PointPosition}
     */
    this.position = new PointPosition(position)
  }

  /**
   *
   * @returns {Object}
   */
  serialize() {
    return {
      id: this.id,
      uKey: this.uKey,
      hrm: this.hrm,
      time: this.time,
      speed: this.speed,
      distance: this.distance,
      position: this.position.asArray(),
      prevUKey: this.prevPoint ? this.prevPoint.uKey : null,
    }
  }

  /**
   *
   * @returns {number}
   */
  get hrm() {
    return this.position.hrm
  }

  /**
   * The distance between current and previous geo coordinates. Meters
   *
   * @returns {number}
   */
  get distance() {
    return this.prevPoint ? this.calculateDistance(this, this.prevPoint) : 0
  }

  /**
   * The speed between current and previous geo coordinates. Km/h
   *
   * @returns {number}
   */
  get speed() {
    return this.prevPoint ? this.calculateSpeed(this, this.prevPoint) : 0
  }

  /**
   * The time in seconds between current and previous geo coordinates. Seconds.
   *
   * @returns {number}
   */
  get time() {
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
    const prev = { latitude: prevPoint.position.latitude, longitude: prevPoint.position.longitude }
    const curr = { latitude: point.position.latitude, longitude: point.position.longitude }
    return getDistance(prev, curr, 6, 6)
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
      return (point.position.time - point.position.pauseTime - prevPoint.position.time) / 1000
    }
    return 0
  }
}

export default Point