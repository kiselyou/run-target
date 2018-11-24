<nav class="navbar navbar-expand-lg navbar-dark bg-dark menu">
  <router-link  class="navbar-brand" to="/">
    <VueImg name="logo" width="30" height="30"/>
  </router-link>
  <button class="navbar-toggler menu_btn" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Run Target">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbar" data-toggle="collapse" data-target="#navbar">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" :class="{active: isActive(route)}" v-for="route of routes">
        <router-link  class="nav-link" :to="route.path">{{ route.text }}</router-link>
      </li>
    </ul>
  </div>
</nav>