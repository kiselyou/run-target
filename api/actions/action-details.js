import { getTotalDistances } from './../repositories/distance'
import { saveKeyAndGetDeviceId } from './../repositories/device'
import objectPath from 'object-path'

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Promise<void>}
 */
export async function viewDetailsAction({ req, res, db }) {
  if (!req.deviceKey) {
    return res.status(403).send('Device key is required.')
  }
  const timestamp = objectPath.get(req, ['params', 'timestamp'], 0)
  const date = new Date()
  if (timestamp > 0) {
    date.setTime(timestamp)
  }
  console.log(date)
  const deviceId = await saveKeyAndGetDeviceId(db, req.deviceKey)
  const distances = await getTotalDistances(db, deviceId, date)
  return res.send(distances)
}