
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
      point.prevPointUKey,
      JSON.stringify(point.position)
    ]
  })

  return db.query(`INSERT INTO point (distanceId, time, uKey, speed, prevPointUKey, position) VALUES ?`, [ rows ])
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
    points.map((point) => {
      point.position = JSON.parse(point.position)
      return point
    })
  }
  return points
}