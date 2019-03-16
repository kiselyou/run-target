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
          yaxis: [{
            y: this.avgPoints(),
            borderColor: '#999999',
            label: {
              show: true,
              text: `Средняя частота пульса ${this.avgPoints()} (уд.м.)`,
              style: {
                color: '#FFFFFF',
                background: '#00E396'
              }
            }
          }],
        },
        chart: {
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
        xaxis: {
          type: 'datetime',
          min: this.minPoint(),
          max: this.maxPoint(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: 'hh:mm'
          }
        },
        stroke: {
          width: 1,
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
    avgPoints() {
      const cache = { sum: 0, count: 0 }
      for (const point of this.points) {
        cache.sum += point.y
        cache.count++
      }
      return cache.sum > 0 ? cache.sum / cache.count : 0
    },
  },
  template: template
})