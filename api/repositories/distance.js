
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
 * @param {number} deviceId
 * @param {Date} date
 * @returns {Promise<Object|?>}
 */
export const getTotalDistances = (db, deviceId, date) => {
  return db.findOne(`
    SELECT
      (
       SELECT ROUND(SUM(dst.pathLength))
         FROM activity as act
              INNER JOIN distance as dst ON dst.activityId = act.id
        WHERE deviceId = ?
      ) AS totalDistance,
      (
        SELECT ROUND(SUM(dst.pathLength))
          FROM activity as act
               INNER JOIN distance as dst ON dst.activityId = act.id
         WHERE deviceId = ? AND date >= DATE_FORMAT(? ,'%Y-%m-01')
      ) AS totalMonthDistance,
      (
        SELECT ROUND(SUM(dst.pathLength))
          FROM activity as act
               INNER JOIN distance as dst ON dst.activityId = act.id
         WHERE deviceId = ? AND date >= SUBDATE(DATE(?), WEEKDAY(?))
      ) AS totalWeekDistance
  `, [deviceId, deviceId, date, deviceId, date, date])
}

/**
 *
 * @param {MySQL} db
 * @param {number} deviceId
 * @returns {Promise<Array>}
 */
export const getDistancesPathLength = (db, deviceId) => {
  return db.query(`
    SELECT SUM(d.pathLength) AS pathLength,
           date
      FROM activity AS a
           INNER JOIN distance AS d on a.id = d.activityId
     WHERE a.deviceId = ?
     GROUP BY date
  `, [deviceId])
}

/**
 *
 * @param {MySQL} db
 * @param {number} activityId
 * @returns {Promise<Array>}
 */
export const removeDistancesByActivityId = (db, activityId) => {
  return db.query(`DELETE FROM distance WHERE activityId = ?`, [activityId])
}