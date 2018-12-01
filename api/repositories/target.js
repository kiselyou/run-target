/**
 *
 * @param {MySQL} db
 * @param {number} deviceId
 * @param {Object} params
 * @returns {*}
 */
export const saveTarget = (db, deviceId, params = {}) => {
  if (params['startDate'] && typeof params['startDate'] === 'string') {
    params['startDate'] = new Date(params['startDate'])
  }

  if (params['options'] && typeof params['options'] === 'object') {
    params['options'] = JSON.stringify(params['options'])
  }

  return db.query(`INSERT INTO target SET ?`, Object.assign({ deviceId }, params))
    .then(function(results) {
      return results.insertId;
    })
}

/**
 *
 * @param {MySQL} db
 * @param {number} targetId
 * @returns {Promise<Object>}
 */
export const getTargetById = async (db, targetId) => {
  const res = await db.findOne(`SELECT * FROM target WHERE id = ?`, [ Number(targetId) ])
  if (res) {
    res['options'] = JSON.parse(res['options'])
  }
  return res
}