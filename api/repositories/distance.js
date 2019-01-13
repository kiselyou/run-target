
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
         WHERE deviceId = ? AND dateTimeStart >= DATE_FORMAT(? ,'%Y-%m-01')
      ) AS totalMonthDistance,
      (
        SELECT ROUND(SUM(dst.pathLength))
          FROM activity as act
               INNER JOIN distance as dst ON dst.activityId = act.id
         WHERE deviceId = ? AND dateTimeStart >= SUBDATE(?, WEEKDAY(?))
      ) AS totalWeekDistance
  `, [deviceId, deviceId, date, deviceId, date, date])
}

/**
 *
 * @param {MySQL} db
 * @param {number} deviceId
 * @param {number} timestamp
 * @returns {Promise<Array>}
 */
export const getDistancesPathLength = (db, deviceId, timestamp) => {
  const date = new Date()
  date.setTime(Number(timestamp))
  return db.query(`
    SELECT SUM(d.pathLength) AS pathLength,
           DATE(a.dateTimeStart) AS date
      FROM activity AS a
           INNER JOIN distance AS d on a.id = d.activityId
     WHERE a.deviceId = ?
       AND DATE(a.dateTimeStart) BETWEEN DATE_FORMAT(? ,'%Y-%m-01') AND LAST_DAY(?)
     GROUP BY date
  `, [deviceId, date, date])
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