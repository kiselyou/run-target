<div class="geo-run">

  <div class="geo-run_body my-4">
    <button class="geo-run_btn geo-run_btn__disabled mx-2" v-if="disabled">
      <span class="geo-run_btn__text">начало</span>
    </button>

    <button class="geo-run_btn geo-run_btn__orange mx-2" v-if="!disabled && status === 0" v-on:click="start">
      <span class="geo-run_btn__text">начало</span>
    </button>

    <button class="geo-run_btn geo-run_btn__orange mx-2" v-if="!disabled && status === 1" v-on:click="pause">
      <span class="geo-run_btn__text">пауза</span>
    </button>

    <button class="geo-run_btn geo-run_btn__red mx-2" v-if="!disabled && status === 2" v-on:click="end">
      <span class="geo-run_btn__text">конец</span>
    </button>

    <button class="geo-run_btn geo-run_btn__green mx-2" v-if="!disabled && status === 2" v-on:click="run">
      <span class="geo-run_btn__text">продолжить</span>
    </button>
  </div>

  <div class="geo-run_head">
    <RunProcess :start="0" :finish="1400" :value="240"/>
  </div>

</div>