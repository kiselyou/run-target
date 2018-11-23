<nav class="navbar navbar-expand-lg navbar-dark bg-dark menu">
  <div class="navbar-brand">
    Минск <span>-5</span><span>&deg;C</span>
  </div>
  <button class="navbar-toggler menu_btn" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Run Target">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbar">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item" :class="{active: isActive(route)}" v-for="route of routes">
        <router-link  class="nav-link" :to="route.path">{{ route.text }}</router-link>
      </li>
    </ul>
  </div>
</nav>