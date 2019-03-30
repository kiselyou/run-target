import {
  removeActivitiesAction,
  saveActivityAction,
  saveCustomActivityAction,
  dayActivitiesAction,
  allActivitiesAction
} from '../action-activity'

export default [
  {
    method: 'post',
    path: '/activity/save',
    action: saveActivityAction
  },
  {
    method: 'post',
    path: '/activity/save/custom',
    action: saveCustomActivityAction
  },
  {
    method: 'post',
    path: '/activity/remove',
    action: removeActivitiesAction
  },
  {
    method: 'get',
    path: '/activity/day/:timestamp',
    action: dayActivitiesAction
  },
  {
    method: 'get',
    path: '/activity/all',
    action: allActivitiesAction
  },
]