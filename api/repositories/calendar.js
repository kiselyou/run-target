/**
 *
 * @param {MySQL} db
 * @param {number} targetId
 * @param {Array.<Object>} days
 * @returns {*}
 */
export const saveCalendar = (db, targetId, days) => {
  const params = days.map(day => {
    return [
      targetId,
      day.enabled,
      new Date(day.date),
      JSON.stringify(day.options)
    ]
  })
  return db.query(`INSERT INTO calendar (targetId, enabled, date, options) VALUES ?`, [ params ])
}

/**
 *
 * @param {MySQL} db
 * @param {number} targetId
 * @returns {Array.<Object>}
 */
export const getCalendarByTargetId = (db, targetId) => {
  const days = db.query(`SELECT * FROM calendar WHERE targetId = ?`, [ Number(targetId) ])
  return days.map(day => {
    day.options = JSON.parse(day.options)
    return day
  })
}