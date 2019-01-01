import {
  saveActivityAction,
  viewActivitiesAction
} from '../action-activity'

export default [
  {
    method: 'post',
    path: '/activity/save',
    action: saveActivityAction
  },
  {
    method: 'get',
    path: '/activity/view/:timestamp',
    action: viewActivitiesAction
  },
]