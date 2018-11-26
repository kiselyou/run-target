<div class="geo-run">

  <div class="geo-run_body my-2">

    <Timer :disabled="disabled" @onStart="start" @onStop="stop" @onEnd="end">
      <Speed :tempo="tempo()" :distance="path()" :speed="speed()" class="my-3"/>
      <RunProcess :finishDistance="finishDistance()" :currentDistance="path()" class="my-3"/>
      <div class="row">
        <div class="col-12 text-center text-danger">{{ this.geoErrorMessage }}</div>
      </div>
    </Timer>

  </div>

  <CalendarRun :startDate="startDate" class="mt-3" @onMounted="setCurrentDay" />

</div>