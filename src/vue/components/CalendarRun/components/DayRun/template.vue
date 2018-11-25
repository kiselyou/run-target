
<Day :day="day" @onClick="onClick">
  <template slot="body">
    <div class="day-run day-run_mark" v-if="day.hasOption('distance') && day.isNow">
      <i class="oi oi-timer" v-if="day.getOption('result') === 0"></i>
      <i class="oi oi-thumb-up" v-if="day.getOption('result') >= day.getOption('distance')"></i>
      <i class="oi oi-check" v-if="day.getOption('result') > 0 && day.getOption('result') < day.getOption('distance')"></i>
    </div>

    <div class="day-run day-run_mark" v-if="day.hasOption('distance') && day.isBeforeNow">
      <i class="oi oi-thumb-down" v-if="day.getOption('result') === 0"></i>
      <i class="oi oi-thumb-up" v-if="day.getOption('result') >= day.getOption('distance')"></i>
      <i class="oi oi-check" v-if="day.getOption('result') > 0 && day.getOption('result') < day.getOption('distance')"></i>
    </div>

    <div class="day-run day-run_result" v-if="day.hasOption('distance') && day.isBeforeNow">
      {{ day.getOption('result') }} {{ day.getOption('unit') }}
    </div>

    <span>{{ day.number }}</span>

    <div class="day-run day-run_target" v-if="day.hasOption('distance')">
      {{ day.getOption('distance') }} {{ day.getOption('unit') }}
    </div>
  </template>
</Day>