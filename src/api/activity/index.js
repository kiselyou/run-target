import Ajax from '@lib/Ajax'
import Activity from './Activity'
import IndexedDB from '@lib/IndexedDB'
import { dayTimestamp } from '@lib/helpers/date-helper'

const indexes = [
  { indexName: 'index_timestamp', column: 'timestamp', unique: true }
]
const idb = new IndexedDB().createTable('activity', true, null, indexes)

export const updateAllActivitiesInDB = async () => {
  // Загрузить информацию c API о всех активностях.
  const data = await Ajax.get(`activity/all`)
  for (const activities of data) {
    const timestamp = dayTimestamp(activities[0]['date'])
    await saveOrUpdateActivitiesInDB(activities, timestamp)
  }
}

/**
 *
 * @param {Date|string|number} date
 * @returns {Promise.<void>}
 */
export const updateDayActivitiesInDB = async (date) => {
  // Загрузить информацию c API об активностях за день.
  const timestamp = dayTimestamp(date)
  const activities = await Ajax.get(`activity/day/${timestamp}`)
  await saveOrUpdateActivitiesInDB(activities, timestamp)
}

/**
 *
 * @param {Date|string|number} date
 * @returns {Promise<Array.<Object>>}
 */
export const loadDayActivitiesFromDB = async (date) => {
  const timestamp = dayTimestamp(date)
  const results = await idb.getOneByIndex('activity', 'index_timestamp', timestamp)
  if (!results) {
    return []
  }
  const activities = []
  for (const arr of results.data) {
    // Трансформировать массив в объект для удобочитаемости.
    const activity = new Activity().fromArray(arr).toObject()
    activities.push(activity)
  }
  return activities
}

/**
 * Сохранить или обновить активности за день в IndexedDB.
 *
 * @param {Array.<Object>} activities - массив активностей загруженных с API.
 * @param {number} timestamp - метка времени начала дня.
 * @returns {Promise<void>}
 */
async function saveOrUpdateActivitiesInDB(activities, timestamp) {
  const result = []
  // Трансформировать объект в массив для уменьшения веса.
  for (const activity of activities) {
    result.push(new Activity().fromObject(activity))
  }

  // Обновить информацию об активностях за день в IndexedDB.
  await idb.removeByIndex('activity', 'index_timestamp', timestamp)
  await idb.saveOne('activity', { timestamp, data: result })
}