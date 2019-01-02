import { getTotalDistances } from './../repositories/distance'
import objectPath from 'object-path'

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Promise<void>}
 */
export async function viewDetailsAction({ req, res, db }) {
  const timestamp = objectPath.get(req, ['params', 'timestamp'], new Date().getTime())
  const date = new Date()
  if (timestamp > 0) {
    date.setTime(timestamp)
  }
  const distances = await getTotalDistances(db, date)
  return res.send(distances)
}