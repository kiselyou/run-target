<div class="geo-run">

  <div class="geo-run_body my-2">

    <Timer :disabled="disabled" @onStart="start" @onStop="stop" @onEnd="end">
      <Speed :tempo="tempo()" :distance="path()" :speed="speed()" class="my-3"/>
      <RunProcess :finishDistance="finishDistance" :currentDistance="path()" class="my-3"/>
    </Timer>

  </div>

</div>