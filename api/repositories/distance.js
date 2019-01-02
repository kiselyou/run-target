
/**
 *
 * @param {MySQL} db
 * @param {number} activityId
 * @param {Object} params
 * @returns {Promise.<number>}
 */
export const saveDistance = (db, activityId, params = {}) => {
  return db.query(`INSERT INTO distance SET ?`, Object.assign({ activityId }, params))
    .then(function(results) {
      return results.insertId;
    })
}

/**
 *
 * @param {MySQL} db
 * @param {number} activityId
 * @returns {Promise<Array>}
 */
export const getDistances = (db, activityId) => {
  return db.query(`SELECT * FROM distance WHERE activityId = ?`, [activityId])
}

/**
 *
 * @param {MySQL} db
 * @param {Date} date
 * @returns {Promise<Object|?>}
 */
export const getTotalDistances = (db, date) => {
  return db.findOne(`
    SELECT
      (
       SELECT ROUND(SUM(dst.pathLength))
         FROM activity as act
              INNER JOIN distance as dst ON dst.activityId = act.id
      ) AS totalDistance,
      (
        SELECT ROUND(SUM(dst.pathLength))
          FROM activity as act
               INNER JOIN distance as dst ON dst.activityId = act.id
         WHERE dateTimeStart >= DATE_FORMAT(? ,'%Y-%m-01')
      ) AS totalMonthDistance,
      (
        SELECT ROUND(SUM(dst.pathLength))
          FROM activity as act
               INNER JOIN distance as dst ON dst.activityId = act.id
         WHERE dateTimeStart >= SUBDATE(?, WEEKDAY(?))
      ) AS totalWeekDistance
  `, [date, date, date])
}