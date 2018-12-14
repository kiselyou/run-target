import { getDistance } from 'geolib'
import PointPosition from './PointPosition'
import objectPath from 'object-path'
let uKey = 0

class Point {
  /**
   *
   * @param {{lat: number, lng: number, [time]: number}} position
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
     * @type {{ speed: number|?, distance: number|? }}
     */
    this.cache = { speed: null, distance: null }

    /**
     * Время таймера.
     *
     * @type {number}
     */
    this.time = 0
  }

  /**
   *
   * @param {number} value
   * @returns {Point}
   */
  setTime(value) {
    this.time = value
    return this
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
      position: this.position,
      prevPointUKey: this.prevPoint ? this.prevPoint.uKey : null,
    }
  }

  /**
   * Calculates the distance between current and previous geo coordinates.
   * Return value is always float and represents the distance in meters.
   *
   * @returns {number}
   */
  get distance() {
    if (this.prevPoint instanceof Point) {
      if (this.cache.distance) {
        return this.cache.distance
      }
      this.cache.distance = getDistance(this.prevPoint.position, this.position, 6, 6)
      return this.cache.distance
    }
    return 0
  }

  /**
   *
   * @returns {number}
   */
  get speed() {
    if (this.prevPoint instanceof Point) {
      if (this.cache.speed) {
        return this.cache.speed
      }
      const measures = 0.001
      const time = (this.position.timestamp / 1000) - (this.prevPoint.position.timestamp / 1000)
      const mPerHr = (this.distance / time) * 3600
      this.cache.speed = Math.round(mPerHr * measures * 10000) / 10000
      return this.cache.speed
    }
    return 0
  }
}

export default Point