import Point from './Point'

/**
 *
 * @typedef {Object} DistanceData
 *
 * @property {number|?} id
 * @property {number|?} number
 * @property {number|?} avgHRM
 * @property {number|?} avgSpeed
 * @property {number|?} activityId
 * @property {number|?} elapsedTime
 * @property {number|?} pathLength
 * @property {string|number|?} uKey
 * @property {string|number|?} prevUKey
 * @property {Array.<PointData>} points
 */
class Distance extends Array {
  constructor() {
    super()
  }

  /**
   *
   * @param {Array} distance
   * @returns {Distance}
   */
  fromArray(distance) {
    this.push(distance[Distance.ID])
    this.push(distance[Distance.NUMBER])
    this.push(distance[Distance.AVG_HRM])
    this.push(distance[Distance.AVG_SPEED])
    this.push(distance[Distance.ACTIVITY_ID])
    this.push(distance[Distance.ELAPSED_TIME])
    this.push(distance[Distance.PATH_LENGTH])
    this.push(distance[Distance.U_KEY])
    this.push(distance[Distance.PREV_U_KEY])

    const points = []
    for (const point of distance[Distance.POINTS]) {
      points.push(new Point().fromArray(point))
    }
    this.push(points)
    return this
  }

  /**
   * @param {Object|DistanceData} data
   * @returns {Distance}
   */
  fromObject(data) {
    this.push(data['id'])
    this.push(data['number'])
    this.push(data['avgHRM'])
    this.push(data['avgSpeed'])
    this.push(data['activityId'])
    this.push(data['elapsedTime'])
    this.push(data['pathLength'])
    this.push(data['uKey'])
    this.push(data['prevUKey'])

    const points = []
    for (const point of data['points']) {
      points.push(new Point().fromObject(point))

    }
    this.push(points)
    return this
  }

  /**
   *
   * @returns {Object|DistanceData}
   */
  toObject() {
    const points = []
    for (const point of this.points) {
      points.push(point.toObject())
    }
    return {
      id: this.id,
      uKey: this.uKey,
      number: this.number,
      avgHRM: this.avgHRM,
      prevUKey: this.prevUKey,
      avgSpeed: this.avgSpeed,
      activityId: this.activityId,
      elapsedTime: this.elapsedTime,
      pathLength: this.pathLength,
      points: points,
    }
  }

  /**
   *
   * @returns {number|?}
   */
  get id() {
    return this[Distance.ID] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get number() {
    return this[Distance.NUMBER] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get avgHRM() {
    return this[Distance.AVG_HRM] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get avgSpeed() {
    return this[Distance.AVG_SPEED] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get activityId() {
    return this[Distance.ACTIVITY_ID] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get elapsedTime() {
    return this[Distance.ELAPSED_TIME] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get pathLength() {
    return this[Distance.PATH_LENGTH] || null
  }

  /**
   *
   * @returns {string|number|?}
   */
  get uKey() {
    return this[Distance.U_KEY] || null
  }

  /**
   *
   * @returns {string|number|?}
   */
  get prevUKey() {
    return this[Distance.PREV_U_KEY] || null
  }

  /**
   *
   * @returns {Array}
   */
  get points() {
    return this[Distance.POINTS] || []
  }

  static get ID() {
    return 0
  }

  static get NUMBER() {
    return 1
  }

  static get AVG_HRM() {
    return 2
  }

  static get AVG_SPEED() {
    return 3
  }

  static get ACTIVITY_ID() {
    return 4
  }

  static get ELAPSED_TIME() {
    return 5
  }

  static get PATH_LENGTH() {
    return 6
  }

  static get U_KEY() {
    return 7
  }

  static get PREV_U_KEY() {
    return 8
  }

  static get POINTS() {
    return 9
  }
}

export default Distance