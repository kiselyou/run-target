<div>
  <div class="row">
    <button class="btn btn-dark" type="button" v-if="!watchID" v-on:click="start">Start</button>
    <button class="btn btn-dark" type="button" v-if="watchID" v-on:click="stop">Stop</button>
  </div>
  <div class="row">
    <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 p-1">
      <div>Distance: {{ this.distance }}</div>
      <div>Speed: {{ this.speed }}</div>
    </div>

    <!--<div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 p-1">
      Debug:
      <ul>
        <li v-for="item of debug">
          {{ item }}
        </li>
      </ul>
    </div>-->
  </div>
</div>