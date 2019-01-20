import {
  removeActivitiesAction,
  saveActivityAction,
  saveCustomActivityAction,
  viewActivitiesAction
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
    path: '/activity/view/:timestamp',
    action: viewActivitiesAction
  },
]