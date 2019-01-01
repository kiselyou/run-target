import objectPath from 'object-path'
import { saveActivity, getActivitiesByDateStart } from './../repositories/activity'
import { saveDistance, getDistances } from './../repositories/distance'
import { savePoints } from './../repositories/point'

/**
 * Update user activity.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {MySQL} db
 * @returns {Promise<void>}
 */
export async function saveActivityAction({ req, res, db }) {
  // сохраняем активность пользователя.
  const dateTimeStart = objectPath.get(req, ['body', 'activity', 'dateTimeStart'], null)
  const dateTimeStop = objectPath.get(req, ['body', 'activity', 'dateTimeStop'], null)
  const activityId = await saveActivity(db, dateTimeStart, dateTimeStop)

  // сохраняем дистанцию (отрезки по 1-км).
  const distances = objectPath.get(req, [ 'body', 'activity', 'distances' ], [])
  for (const distance of distances) {
    const points = objectPath.get(distance, 'points', [])

    const distanceId = await saveDistance(db, activityId, {
      uKey: distance.uKey,
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
  const timestamp = objectPath.get(req, ['params', 'timestamp'], 0)
  const date = new Date()
  date.setTime(timestamp)
  const activities = await getActivitiesByDateStart(db, date)
  for (const activity of activities) {
    activity['distances'] = await getDistances(db, activity.id)
  }
  return res.send(activities)
}