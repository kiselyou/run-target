export const TYPE_GPS_LOCATION = 1
export const TYPE_USER_FORM = 2

/**
 *
 * @param {MySQL} db
 * @param {number} deviceId
 * @param {{ dateTimeStart: (string|Date), dateTimeStop: (string|Date), type: number }} options
 * @returns {Promise.<number>}
 */
export const saveActivity = (db, deviceId, options) => {
  const params = [
    new Date(options.dateTimeStart),
    new Date(options.dateTimeStart),
    new Date(options.dateTimeStop),
    deviceId,
    options.type
  ]
  return db.query(`INSERT INTO activity (date, dateTimeStart, dateTimeStop, deviceId, type) VALUES (?, ?, ?, ?, ?)`, params)
    .then(results => results.insertId)
}

/**
 *
 * @param {MySQL} db
 * @param {number} deviceId
 * @param {Date} date
 * @returns {Promise<Array>}
 */
export const getActivitiesByDate = (db, deviceId, date) => {
  return db.query(`SELECT * FROM activity WHERE date = DATE(?) AND deviceId = ?`, [date, deviceId])
}

/**
 *
 * @param {MySQL} db
 * @param {number} activityId
 * @returns {Promise<Array>}
 */
export const removeActivityById = (db, activityId) => {
  return db.query(`DELETE FROM activity WHERE id = ?`, [activityId])
}