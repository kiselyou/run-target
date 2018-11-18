
<Month :month="month" :locale="locale" :showArrow="showArrow" @nextMonth="next"  @prevMonth="prev">
  <template slot="week">
    <template v-for="weeks of month.weeks">
      <DayRun :key="day.id" :day="day" v-for="day of weeks.days"/>
    </template>
  </template>
</Month>