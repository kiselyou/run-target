import { getDistance } from 'geolib'
import PointPosition from './PointPosition'
import objectPath from 'object-path'
import uuid from 'uuid/v4'

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
     * @type {string}
     */
    this.uKey = uuid()

    /**
     *
     * @type {PointPosition}
     */
    this.position = new PointPosition(
      objectPath.get(position, 'lat', 0),
      objectPath.get(position, 'lng', 0),
      objectPath.get(position, 'time', null)
    )

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
  }

  /**
   *
   * @returns {Object}
   */
  serialize() {
    return {
      id: this.id,
      uKey: this.uKey,
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
      const time = (this.position.time / 1000) - (this.prevPoint.position.time / 1000)
      const mPerHr = (this.distance / time) * 3600
      this.cache.speed = Math.round(mPerHr * measures * 10000) / 10000
      return this.cache.speed
    }
    return 0
  }
}

export default Point