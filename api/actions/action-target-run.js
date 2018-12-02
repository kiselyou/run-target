import objectPath from 'object-path'
import { getDevice } from './../repositories/device'
import { saveTarget, getTargetById } from './../repositories/target'
import { saveCalendarDays, getCalendarDaysByTargetId, getCalendarDayById, updateCalendarDayById } from './../repositories/calendar'

import { saveDistance } from './../repositories/distance'
import { savePoints } from './../repositories/point'

/**
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
 * Update day in calendar.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Promise<void>}
 */
export async function updateDayAction({ req, res, db }) {
  const dayId = objectPath.get(req, ['params', 'dayId'], null)

  console.log(
    objectPath.get(req, ['body', 'day', 'options'], null)
  )

  await updateCalendarDayById(db, dayId, {
    options: objectPath.get(req, ['body', 'day', 'options'], null)
  })

  return res.send({ status: true, action: 'day' })
}

/**
 * Update points in calendar.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Object}
 */
export async function updatePointsAction({ req, res, db }) {
  const distances = objectPath.get(req, [ 'body', 'distances' ], [])
  const targetId = objectPath.get(req, [ 'params', 'targetId' ], null)

  for (const distance of distances) {
    const distanceId = await saveDistance(db, targetId, {
      uKey: distance.uKey,
      pathLength: distance.pathLength,
      distanceNumber: distance.distanceNumber,
      prevDistanceUKey: distance.prevDistanceUKey,
    })
    const points = objectPath.get(distance, 'points', [])
    await savePoints(db, distanceId, points)
  }
  return res.send({ status: true, action: 'points' })
}

/**
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