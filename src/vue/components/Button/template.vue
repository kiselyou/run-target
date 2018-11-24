
<button
  :class="{
    'mx-1': mx === 1,
    'mx-2': mx === 2,
    'mx-3': mx === 3,
    'mx-4': mx === 4,
    'my-1': my === 1,
    'my-2': my === 2,
    'my-3': my === 3,
    'my-4': my === 4,
    'button__red': !disabled && skin === 'red',
    'button__green': !disabled && skin === 'green',
    'button__orange': !disabled && skin === 'orange',
    'button__disabled': disabled,
  }"
  :style="{
    'min-width': width
  }"
  class="button mx-2" v-if="show" v-on:click="clickEvent">

  <slot>
    <i :class="iconName" v-if="iconName"></i>
    <span class="button__text" v-if="text">{{ text }}</span>
  </slot>
</button>