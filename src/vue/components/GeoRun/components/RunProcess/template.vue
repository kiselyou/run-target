<div class="run-process">
  <div class="run-process_road">

    <div class="run-process_mark" style="left: 0">
      <div class="run-process_mark__delimiter"></div>
      <div class="run-process_mark__text">{{ start }}</div>
    </div>

    <div class="run-process_mark" :style="processMarkStyle">
      <div class="run-process_mark__delimiter run-process_mark__top"></div>
      <div class="run-process_mark__text run-process_mark__position">
        <i class="oi oi-map-marker"></i>
        <span>{{ value }} {{ unit(value) }}</span>
      </div>
    </div>

    <div class="run-process_mark" style="left: 100%">
      <div class="run-process_mark__delimiter"></div>
      <div class="run-process_mark__text run-process_mark__right">{{ finish }} {{ unit(finish) }}</div>
    </div>

  </div>
</div>