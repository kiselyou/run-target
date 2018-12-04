import { getDistance, getSpeed } from 'geolib'
import PointPosition from './PointPosition'
import uuid from 'uuid/v4'

class Point {
  /**
   *
   * @param {Object} position
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
   *
   * @returns {number}
   */
  get lat() {
    return this.position.coords.latitude
  }

  /**
   *
   * @returns {number}
   */
  get lng() {
    return this.position.coords.longitude
  }

  /**
   *
   * @returns {number}
   */
  get time() {
    return this.position.timestamp
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
      this.cache.distance = getDistance(
        { latitude:  this.prevPoint.lat, longitude:  this.prevPoint.lng },
        { latitude:  this.lat, longitude:  this.lng }
      )
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
      if (this.prevPoint.time === this.time) {
        return 0
      }
      this.cache.speed = getSpeed(
        { lat: this.prevPoint.lat, lng: this.prevPoint.lng, time: this.prevPoint.time },
        { lat: this.lat, lng: this.lng, time: this.time },
        { unit: 'kmh' }
      );
      return this.cache.speed
    }
    return 0
  }
}

export default Point