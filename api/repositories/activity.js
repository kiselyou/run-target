
/**
 *
 * @param {MySQL} db
 * @param {number} calendarId
 * @param {string|Date} dateTimeStart
 * @param {string|Date} dateTimeStop
 * @returns {Promise.<number>}
 */
export const saveActivity = (db, calendarId, dateTimeStart, dateTimeStop) => {
  const params = [calendarId, new Date(dateTimeStart), new Date(dateTimeStop)]
  return db.query(`INSERT INTO activity (calendarId, dateTimeStart, dateTimeStop) VALUES (?, ?, ?)`, params)
    .then(results => results.insertId)
}

/**
 *
 * @param {MySQL} db
 * @param {number} calendarId
 * @returns {Promise<Array>}
 */
export const getActivities = (db, calendarId) => {
  return db.query(`SELECT * FROM activity WHERE calendarId = ?`, [calendarId])
}