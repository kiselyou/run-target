
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
      point.uKey,
      point.prevPointUKey,
      JSON.stringify(point.position)
    ]
  })

  return db.query(`INSERT INTO point (distanceId, uKey, prevPointUKey, position) VALUES ?`, [ rows ])
}