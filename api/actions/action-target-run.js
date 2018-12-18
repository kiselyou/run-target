import objectPath from 'object-path'
import { getDevice } from './../repositories/device'
import { saveActivity, getActivities } from './../repositories/activity'
import { saveTarget, getTargetById } from './../repositories/target'
import { saveCalendarDays, getCalendarDaysByTargetId, updateCalendarDayById } from './../repositories/calendar'
import { saveDistance, getDistances } from './../repositories/distance'
import { savePoints, getPoints } from './../repositories/point'

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
 * Update day activity.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Promise<void>}
 */
export async function saveActivityAction({ req, res, db }) {
  const calendarId = objectPath.get(req, ['params', 'dayId'], null)
  // обновляем информацию в календаре
  await updateCalendarDayById(db, calendarId, {
    options: objectPath.get(req, ['body', 'day', 'options'], null)
  })

  // сохраняем активность пользователя.
  const dateTimeStart = objectPath.get(req, ['body', 'geo', 'dateTimeStart'], null)
  const dateTimeStop = objectPath.get(req, ['body', 'geo', 'dateTimeStop'], null)
  const activityId = await saveActivity(db, calendarId, dateTimeStart, dateTimeStop)

  // сохраняем дистанцию (отрезки по 1-км).
  const distances = objectPath.get(req, [ 'body', 'geo', 'distances' ], [])
  for (const distance of distances) {
    const points = objectPath.get(distance, 'points', [])

    const distanceId = await saveDistance(db, activityId, {
      uKey: distance.uKey,
      time: distance.time,
      number: distance.number,
      prevUKey: distance.prevUKey,
      avgSpeed: distance.avgSpeed,
      pathLength: distance.pathLength,
      elapsedTime: distance.elapsedTime,
    })
    // сохраняем навигационные точки на отрезке.
    await savePoints(db, distanceId, points)
  }
  return res.send({status: true})
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Promise<void>}
 */
export async function viewActivitiesAction({ req, res, db }) {
  const calendarId = objectPath.get(req, ['params', 'dayId'], null)
  const activities = await getActivities(db, calendarId)
  for (const activity of activities) {
    activity['distances'] = await getDistances(db, activity.id)
  }
  return res.send(activities)
}

/**
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