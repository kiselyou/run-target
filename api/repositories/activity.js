
/**
 *
 * @param {MySQL} db
 * @param {string|Date} dateTimeStart
 * @param {string|Date} dateTimeStop
 * @returns {Promise.<number>}
 */
export const saveActivity = (db, dateTimeStart, dateTimeStop) => {
  const params = [new Date(dateTimeStart), new Date(dateTimeStop)]
  return db.query(`INSERT INTO activity (dateTimeStart, dateTimeStop) VALUES (?, ?)`, params)
    .then(results => results.insertId)
}

/**
 *
 * @param {MySQL} db
 * @param {Date} dateStart
 * @returns {Promise<Array>}
 */
export const getActivitiesByDateStart = (db, dateStart) => {
  return db.query(`SELECT * FROM activity WHERE DATE(dateTimeStart) = DATE(?)`, [dateStart])
}