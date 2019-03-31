import './style.scss'
import Vue from 'vue'
import template from './template.html'

import '@vue/Tooltip'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'
import '@vue/Layout'
import '@vue/Button'
import '@module/Spinner'

import { mapGetters, mapState } from 'vuex'

export default Vue.component('Details', {
  data: function () {
    return {

    }
  },
  computed: {
    ...mapGetters('details', [ 'totalPath', 'totalWeekPath', 'totalMonthPath' ]),
    ...mapState({
      /**
       *
       * @param {Object} state
       * @returns {string|?}
       */
      loading: (state) => {
        return state.details.loading
      }
    }),
  },
  template: template
})