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
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
          },
        },
        responsive: [{
          breakpoint: 1000,
          options: {
            chart: {
              zoom: {
                enabled: false,
              },
              toolbar: {
                show: false,
              },
            },
          },
        }],
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
          min: this.minYPoint(),
          max: this.maxYPoint(),
          labels: {
            maxWidth: 30
          }
        },
        xaxis: {
          type: 'datetime',
          min: this.minXPoint(),
          max: this.maxXPoint(),
          tickAmount: 5,
          labels: {
            formatter: function(value, timestamp, index) {
              const date = new Date(timestamp)
              let hours = date.getHours()
              if (hours < 10) {
                hours = `0${hours}`
              }
              let minutes = date.getMinutes()
              if (minutes < 10) {
                minutes = `0${minutes}`
              }
              return `${hours}:${minutes}`
            }
          }
        },
        tooltip: {
          x: {
            format: 'HH:mm:ss'
          }
        },
        stroke: {
          width: 0.4,
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
    minYPoint() {
      let min = Infinity
      for (const point of this.points) {
        if (point.y && point.y < min) {
          min = point.y
        }
      }
      return min === Infinity ? 0 : min - 10
    },
    maxYPoint() {
      let max = - Infinity
      for (const point of this.points) {
        if (point.y && point.y > max) {
          max = point.y
        }
      }
      if (max <= 100) {
        return 100
      }
      return max + 10
    },
    minXPoint() {
      return this.points.length > 0 ? this.points[0]['x'] : 0
    },
    maxXPoint() {
      return this.points.length > 0 ? this.points[this.points.length - 1]['x'] : 0
    },
  },
  template: template
})