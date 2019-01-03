
export const saveOrUpdateDevice = (db, deviceKey, params = {}) => {
  params = Object.assign({ deviceKey }, params)
  return db.query(`INSERT INTO device SET ? ON DUPLICATE KEY UPDATE ?`, [ params, params ])
    .then((results) => results.insertId)
}

export const getDevice = (db, deviceKey) => {
  return db.findOne(`SELECT * FROM device WHERE deviceKey = ?`, [deviceKey])
}

/**
 *
 * @param {MySQL} db
 * @param {string} deviceKey
 * @returns {Promise<number>}
 */
export const saveKeyAndGetDeviceId = async (db, deviceKey) => {
  const device = await getDevice(db, deviceKey)
  if (device) {
    return device['id'];
  }
  return await saveOrUpdateDevice(db, deviceKey)
}