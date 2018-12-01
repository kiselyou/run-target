import objectPath from 'object-path'
import { getDevice } from './../repositories/device'
import { saveTarget, getTargetById } from './../repositories/target'
import { saveCalendar, getCalendarByTargetId } from './../repositories/calendar'

/**
 * Create new calendar.
 *
 * @param {Object} core
 * @returns {Object}
 */
export async function saveAction({ req, res, db }) {
  const device = await getDevice(db, req.body.deviceKey)
  const days = objectPath.get(req, ['body','targetDays'], [])
  const targetId = await saveTarget(db, device['id'], {
    options: req.body.options,
    startKm: req.body.startKm,
    targetKm: req.body.targetKm,
    startDate: req.body.startDate,
  })

  await saveCalendar(db, targetId, days)
  return res.send({status: true})
}

/**
 * Update day in calendar.
 *
 * @returns {Object}
 */
export function updateAction() {

}

/**
 * Update day in calendar.
 *
 * @returns {Object}
 */
export async function viewAction({ req, res, db }) {
  const targetId = objectPath.get(req, ['params', 'targetId'], null)
  const target = await getTargetById(db, targetId)
  if (!target) {
    return res.send({})
  }
  return res.send({
    targetDays: await getCalendarByTargetId(db, targetId),
    startDate: target.startDate,
    targetKm: target.targetKm,
    startKm: target.startKm,
    options: target.options,
  })
}