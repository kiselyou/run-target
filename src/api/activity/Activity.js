import Distance from './Distance'

/**
 *
 * @typedef {Object} ActivityData
 *
 * @property {string|?} dateTimeStart
 * @property {string|?} dateTimeStop
 * @property {number|?} deviceId
 * @property {string|?} date
 * @property {number|?} type
 * @property {number|?} id
 * @property {Array.<DistanceData>} distances
 */
class Activity extends Array {
  constructor() {
    super()
  }

  /**
   *
   * @param {Array} activity
   * @returns {Activity}
   */
  fromArray(activity) {
    this.push(activity[Activity.DATE_TIME_START])
    this.push(activity[Activity.DATE_TIME_STOP])
    this.push(activity[Activity.DEVICE_ID])
    this.push(activity[Activity.DATE])
    this.push(activity[Activity.TYPE])
    this.push(activity[Activity.ID])

    const distances = []
    for (const distance of activity[Activity.DISTANCES]) {
      distances.push(new Distance().fromArray(distance))
    }
    this.push(distances)
    return this
  }

  /**
   * @param {Object|ActivityData} data
   * @returns {Activity}
   */
  fromObject(data) {
    this.push(data['dateTimeStart'])
    this.push(data['dateTimeStop'])
    this.push(data['deviceId'])
    this.push(data['date'])
    this.push(data['type'])
    this.push(data['id'])

    const distances = []
    for (const distance of data['distances']) {
      distances.push(new Distance().fromObject(distance))

    }
    this.push(distances)
    return this
  }

  /**
   *
   * @returns {Object|ActivityData}
   */
  toObject() {
    const distances = []
    for (const distance of this.distances) {
      distances.push(distance.toObject())
    }
    return {
      dateTimeStart: this.dateTimeStart,
      dateTimeStop: this.dateTimeStop,
      deviceId: this.deviceId,
      distances: distances,
      date: this.date,
      type: this.type,
      id: this.id
    }
  }

  /**
   *
   * @returns {string}
   */
  toJson() {
    return JSON.stringify(this)
  }

  /**
   *
   * @param {string} str
   * @returns {Activity}
   */
  fromJson(str) {
    const activity = JSON.parse(str)
    if (Array.isArray(activity)) {
      this.fromArray(activity)
    }
    return this
  }

  /**
   *
   * @returns {string|?}
   */
  get dateTimeStart() {
    return this[Activity.DATE_TIME_START] || null
  }

  /**
   *
   * @returns {string|?}
   */
  get dateTimeStop() {
    return this[Activity.DATE_TIME_STOP] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get deviceId() {
    return this[Activity.DEVICE_ID] || null
  }

  /**
   *
   * @returns {string|?}
   */
  get date() {
    return this[Activity.DATE] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get type() {
    return this[Activity.TYPE] || null
  }

  /**
   *
   * @returns {number|?}
   */
  get id() {
    return this[Activity.ID] || null
  }

  /**
   *
   * @returns {Array}
   */
  get distances() {
    return this[Activity.DISTANCES] || []
  }

  static get DATE_TIME_START() {
    return 0
  }

  static get DATE_TIME_STOP() {
    return 1
  }

  static get DEVICE_ID() {
    return 2
  }

  static get DATE() {
    return 3
  }

  static get TYPE() {
    return 4
  }

  static get ID() {
    return 5
  }

  static get DISTANCES() {
    return 6
  }
}

export default Activity