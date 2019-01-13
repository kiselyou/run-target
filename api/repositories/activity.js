
/**
 *
 * @param {MySQL} db
 * @param {number} deviceId
 * @param {string|Date} dateTimeStart
 * @param {string|Date} dateTimeStop
 * @returns {Promise.<number>}
 */
export const saveActivity = (db, deviceId, dateTimeStart, dateTimeStop) => {
  const params = [new Date(dateTimeStart), new Date(dateTimeStop), deviceId]
  return db.query(`INSERT INTO activity (dateTimeStart, dateTimeStop, deviceId) VALUES (?, ?, ?)`, params)
    .then(results => results.insertId)
}

/**
 *
 * @param {MySQL} db
 * @param {number} deviceId
 * @param {Date} dateStart
 * @returns {Promise<Array>}
 */
export const getActivitiesByDateStart = (db, deviceId, dateStart) => {
  return db.query(`SELECT * FROM activity WHERE DATE(dateTimeStart) = DATE(?) AND deviceId = ?`, [dateStart, deviceId])
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