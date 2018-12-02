/**
 *
 * @param {MySQL} db
 * @param {number} targetId
 * @param {Array.<Object>} days
 * @returns {*}
 */
export const saveCalendarDays = (db, targetId, days) => {
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
export const getCalendarDaysByTargetId = (db, targetId) => {
  const days = db.query(`SELECT * FROM calendar WHERE targetId = ?`, [ Number(targetId) ])
  return days.map(day => {
    day.options = JSON.parse(day.options)
    return day
  })
}

/**
 *
 * @param {MySQL} db
 * @param {number} id
 * @returns {Object|?}
 */
export const getCalendarDayById = async (db, id) => {
  const day = await db.findOne(`SELECT * FROM calendar WHERE id = ?`, [ Number(id) ])
  if (day) {
    day.options = JSON.parse(day.options)
  }
  return day

}

/**
 *
 * @param {MySQL} db
 * @param {number} id
 * @param {Object} params
 * @returns {Object|?}
 */
export const updateCalendarDayById = (db, id, params) => {
  if (params.hasOwnProperty('options') && typeof params.options === 'object') {
    params.options = JSON.stringify(params.options)
  }
  return db.findOne(`UPDATE calendar SET ? WHERE id = ?`, [ params, Number(id) ])
}