
export const saveOrUpdateDevice = (db, deviceKey, params = {}) => {
  params = Object.assign({ deviceKey }, params)
  return db.query(`INSERT INTO device SET ? ON DUPLICATE KEY UPDATE ?`, [ params, params ])
    .then(function(results) {
      return results.insertId;
    })
}

export const getDevice = (db, deviceKey) => {
  return db.findOne(
    `SELECT * FROM device WHERE deviceKey = ?`,
    { deviceKey }
  )
}