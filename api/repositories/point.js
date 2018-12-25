
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
      point.time,
      point.uKey,
      point.speed,
      point.prevUKey,
      JSON.stringify(point.position),
    ]
  })

  return db.query(`INSERT INTO point (distanceId, time, uKey, speed, prevUKey, position) VALUES ?`, [ rows ])
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
      // return JSON.parse(point.tmp)
      point.position = JSON.parse(point.position)
      point.tmp = JSON.parse(point.tmp)
      return point
    })
  }
  return points
}