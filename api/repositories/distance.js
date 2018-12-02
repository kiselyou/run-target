
/**
 *
 * @param {MySQL} db
 * @param {number} targetId
 * @param {Object} params
 * @returns {number}
 */
export const saveDistance = (db, targetId, params = {}) => {
  return db.query(`INSERT INTO distance SET ?`, Object.assign({ targetId }, params))
    .then(function(results) {
      return results.insertId;
    })
}