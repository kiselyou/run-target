import objectPath from 'object-path'
import { getDevice, saveKeyAndGetDeviceId } from './../repositories/device'
import { saveTarget, getTargetById } from './../repositories/target'
import { saveCalendarDays, getCalendarDaysByTargetId } from './../repositories/calendar'
import { getPoints } from './../repositories/point'
import { getDistancesPathLength } from './../repositories/distance'

/**
 * TODO: deprecated
 * Create new calendar.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Object}
 */
export async function saveCalendarAction({ req, res, db }) {
  const device = await getDevice(db, req.body.deviceKey)
  const days = objectPath.get(req, ['body','targetDays'], [])
  const targetId = await saveTarget(db, device['id'], {
    options: req.body.options,
    startKm: req.body.startKm,
    targetKm: req.body.targetKm,
    startDate: req.body.startDate,
  })

  await saveCalendarDays(db, targetId, days)
  return res.send({status: true})
}

/**
 * TODO: deprecated
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Promise<void>}
 */
export async function viewPointsAction({ req, res, db }) {
  const distanceId = objectPath.get(req, [ 'params', 'distanceId' ], [])
  const points = await getPoints(db, distanceId)
  return res.send(points)
}

/**
 * TODO: deprecated
 * Update day in calendar.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Object}
 */
export async function viewCalendarAction({ req, res, db }) {
  const targetId = objectPath.get(req, ['params', 'targetId'], null)
  const target = await getTargetById(db, targetId)
  if (!target) {
    return res.send({})
  }
  return res.send({
    targetDays: await getCalendarDaysByTargetId(db, targetId),
    startDate: target.startDate,
    targetKm: target.targetKm,
    startKm: target.startKm,
    options: target.options,
  })
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Object}
 */
export async function viewCalendarTempoAction({ req, res, db }) {
  if (!req.deviceKey) {
    return res.status(403).send('Device key is required.')
  }
  const deviceId = await saveKeyAndGetDeviceId(db, req.deviceKey)
  const distancesPath = await getDistancesPathLength(db, deviceId)
  const resultDistances = {}
  for (const item of distancesPath) {
    const date = new Date(item.date)
    resultDistances[date.toUTCString()] = { totalDistance: Number(item.pathLength.toFixed(2)) }
  }
  return res.send(resultDistances)
}