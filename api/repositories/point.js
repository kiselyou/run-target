
/**
 *
 * @param {MySQL} db
 * @param {number} deviceId
 * @param {Array.<Object>} points
 * @returns {Promise}
 */
export const savePoints = (db, deviceId, points) => {
  const rows = points.map(point => {
    return [
      deviceId,
      point.hrm,
      point.time,
      point.uKey,
      point.speed,
      point.prevUKey,
      JSON.stringify(point.position),
    ]
  })

  return db.query(`INSERT INTO point (distanceId, hrm, time, uKey, speed, prevUKey, position) VALUES ?`, [ rows ])
}

/**
 *
 * @param {MySQL} db
 * @param {number} deviceId
 * @returns {Promise}
 */
export const getPoints = async (db, deviceId) => {
  const points = await db.query(`SELECT * FROM point WHERE distanceId = ?`, [ Number(deviceId) ])
  if (points.length > 0) {
    return points.map((point) => {
      point.position = JSON.parse(point.position)
      return point
    })
  }
  return points
}

/**
 *
 * @param {MySQL} db
 * @param {number} activityId
 * @returns {Promise<Array>}
 */
export const removePointsByActivityId = (db, activityId) => {
  return db.query(`DELETE FROM point WHERE distanceId IN(SELECT id FROM distance WHERE activityId = ?)`, [activityId])
}