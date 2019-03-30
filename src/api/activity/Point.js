
/**
 *
 * @typedef {Object} PointData
 *
 * @property {number|?} id
 * @property {number|?} hrm
 * @property {number|?} time
 * @property {number|?} speed
 * @property {Array} position
 * @property {number|?} distanceId
 * @property {string|number|?} uKey
 * @property {string|number|?} prevUKey
 */
class Point extends Array {
  constructor() {
    super()
  }

  /**
   *
   * @param {Array} point
   * @returns {Point}
   */
  fromArray(point) {
    this.push(point[Point.ID])
    this.push(point[Point.HRM])
    this.push(point[Point.TIME])
    this.push(point[Point.SPEED])
    this.push(point[Point.POSITION])
    this.push(point[Point.DISTANCE_ID])
    this.push(point[Point.U_KEY])
    this.push(point[Point.PREV_U_KEY])
    return this
  }

  /**
   * @param {Object|PointData} data
   * @returns {Point}
   */
  fromObject(data) {
    this.push(data['id'])
    this.push(data['hrm'])
    this.push(data['time'])
    this.push(data['speed'])
    this.push(data['position'])
    this.push(data['distanceId'])
    this.push(data['uKey'])
    this.push(data['prevUKey'])
    return this
  }

  /**
   *
   * @returns {Object|Point}
   */
  toObject() {
    return {
      id: this.id,
      hrm: this.hrm,
      uKey: this.uKey,
      time: this.time,
      speed: this.speed,
      position: this.position,
      prevUKey: this.prevUKey,
      distanceId: this.distanceId,
    }
  }

  /**
   *
   * @returns {number|?}
   */
  get id() {
    return this[Point.ID] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get hrm() {
    return this[Point.HRM] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get time() {
    return this[Point.TIME] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get speed() {
    return this[Point.SPEED] || null
  }

  /**
   *
   * @returns {Array}
   */
  get position() {
    return this[Point.POSITION] || []
  }

  /**
   *
   * @returns {number|?}
   */
  get distanceId() {
    return this[Point.DISTANCE_ID] || null
  }

  /**
   *
   * @returns {string|number|?}
   */
  get uKey() {
    return this[Point.U_KEY] || null
  }

  /**
   *
   * @returns {string|number|?}
   */
  get prevUKey() {
    return this[Point.PREV_U_KEY] || null
  }

  static get ID() {
    return 0
  }

  static get HRM() {
    return 1
  }

  static get TIME() {
    return 2
  }

  static get SPEED() {
    return 3
  }

  static get POSITION() {
    return 4
  }

  static get DISTANCE_ID() {
    return 5
  }

  static get U_KEY() {
    return 6
  }

  static get PREV_U_KEY() {
    return 7
  }
}

export default Point