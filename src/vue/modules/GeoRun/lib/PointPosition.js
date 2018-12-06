import objectPath from "object-path";

class PointPosition {
  /**
   *
   * @param {{lat: number, lng: number, [time]: number}} position
   */
  constructor(position) {
    /**
     * @type {number}
     */
    this.lat = Number(objectPath.get(position, 'lat', 0))

    /**
     * @type {number}
     */
    this.lng = Number(objectPath.get(position, 'lng', 0))

    /**
     * @type number
     */
    this.speed = objectPath.get(position, 'speed', 0)

    /**
     *
     * @type {number}
     */
    this.time = objectPath.get(position, 'time', Date.now())
  }

  /**
   *
   * @returns {number}
   */
  get latitude() {
    return this.lat
  }

  /**
   *
   * @returns {number}
   */
  get longitude() {
    return this.lng
  }
}

export default PointPosition