<div class="geo-run">

  <div class="geo-run_body my-2">

    <Timer :disabled="disabled">
      <Speed tempoValue="5.50" speedValue="10.50" distanceValue="0.356" class="my-3"/>
      <RunProcess :start="positionStart" :finish="positionFinish" :value="positionCurrent" label="Осталось 1449 км" class="my-3"/>
    </Timer>

  </div>

 <!-- <div class="geo-run_controls my-2" v-if="status === 0">
    <Button :key="1" :disabled="disabled" skin="orange" mx="2" text="старт" icon="media-play" v-on:click="start" />
  </div>

  <div class="geo-run_controls my-2" v-if="!disabled && status === 1">
    <Button :key="2" :disabled="disabled" skin="orange" mx="2" text="пауза" icon="media-pause" v-on:click="pause" />
  </div>

  <div class="geo-run_controls my-2" v-if="!disabled && status === 2">
    <Button :key="3" :disabled="disabled" skin="red" mx="2" text="финиш" icon="media-stop" v-on:click="end" />
    <Button :key="4" :disabled="disabled" skin="green" mx="2" text="продолжить" icon="media-step-forward" v-on:click="run" />
  </div>-->

</div>