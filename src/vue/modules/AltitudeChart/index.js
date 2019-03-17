import template from './template.html'
import './style.scss'
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'

import '@vue/Button'
import '@vue/Grid/Row'
import '@vue/Grid/Cell'

Vue.use(VueApexCharts)
Vue.component('ApexChart', VueApexCharts)

/**
 * https://apexcharts.com/vue-chart-demos/area-charts/github-style/
 */
export default Vue.component('AltitudeChart', {
  props: {
    points: {
      type: Array,
      required: true
    },
  },
  data: function () {
    return {
      selection: null,
      series: [
        {
          name: 'Набор высоты (м)',
          data: this.points
        }
      ],
      chartOptions: {
        chart: {
          animations: {
            enabled: false,
          },
          zoom: {
            enabled: true,
          },
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: true,
              zoom: true,
              zoomin: false,
              zoomout: false,
              pan: true,
              reset: true,
            },
          },
        },
        dataLabels: {
          enabled: false
        },
        grid: {
          show: true,
          yaxis: {
              lines: {
              show: false,
            }
          },
        },
        markers: {
          size: 0,
          style: 'hollow',
        },
        yaxis: {
          labels: {
            maxWidth: 30
          }
        },
        xaxis: {
          type: 'datetime',
          min: this.minPoint(),
          max: this.maxPoint(),
          tickAmount: 2,
          labels: {
            format: 'hh:mm'
          }
        },
        tooltip: {
          x: {
            format: 'hh:mm:ss'
          }
        },
        stroke: {
          width: 0.5,
          curve: 'smooth'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
      }
    }
  },
  methods: {
    minPoint() {
      return this.points.length > 0 ? this.points[0]['x'] : 0
    },
    maxPoint() {
      return this.points.length > 0 ? this.points[this.points.length - 1]['x'] : 0
    },
  },
  template: template
})