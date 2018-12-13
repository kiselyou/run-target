
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