import template from './template.html'
import './style.scss'
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.component('ApexChart', VueApexCharts)

/**
 * https://apexcharts.com/vue-chart-demos/area-charts/github-style/
 */
export default Vue.component('HRMChart', {
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
          name: 'Пульс (уд.м.)',
          data: this.points
        }
      ],
      chartOptions: {
        annotations: {
          yaxis: this.getYAxis(),
        },
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
            format: 'hh:mm:ss'
          }
        },
        stroke: {
          width: .4,
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
      if (min === Infinity) {
        return 20
      }
      return min < 20 ? 20 : min
    },
    maxYPoint() {
      let max = - Infinity
      for (const point of this.points) {
        if (point.y && point.y > max) {
          max = point.y
        }
      }
      if (max <= 20) {
        return 100
      }
      return max + 5
    },
    minXPoint() {
      return this.points.length > 0 ? this.points[0]['x'] : 0
    },
    maxXPoint() {
      return this.points.length > 0 ? this.points[this.points.length - 1]['x'] : 0
    },
    avgPoints() {
      const cache = { sum: 0, count: 0 }
      for (const point of this.points) {
        if (!point.y || point.y < 20) {
          continue
        }
        cache.sum += point.y
        cache.count++
      }
      return cache.sum > 0 ? Math.round(cache.sum / cache.count) : 0
    },
    getYAxis() {
      const avg = this.avgPoints()
      if (avg === 0) {
        return []
      }
      return [
        {
          y: avg,
          borderColor: '#999999',
          label: {
            text: `Средняя частота пульса ${avg} (уд.м.)`,
            style: {
              color: '#FFFFFF',
              background: '#00E396'
            }
          }
        }
      ]
    }
  },
  template: template
})