<template>
  <nav class="navbar navbar-expand-lg navbar-dark nav-color px-3">
    <p class="tower-logo pe-4 m-1 text-light">Tower Events</p>

    <div class="d-flex justify-content-between">
      <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
        <div class="d-flex justify-content-center m-0">
          <!-- <button class="btn btn-primary">Home</button> -->
          <i class="mdi mdi-home selectable f-24"></i>
        </div>
      </router-link>
      <router-link class="navbar-brand d-flex" :to="{ name: 'Account' }">
        <div class="d-flex justify-content-center m-0">
          <i class="mdi mdi-account selectable f-24"></i>
        </div>
      </router-link>
      <!-- Button trigger modal -->
      <div class="d-flex justify-content-center align-items-center">
        <span>
          <i
            class="mdi mdi-plus-circle f-24 selectable text-light"
            data-bs-toggle="modal"
            data-bs-target="#modelId"
          >
          </i>
        </span>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="modelId"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Create An Event</h3>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <CreateEvent />
        </div>
      </div>
    </div>

    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li></li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.tower-logo {
  font-size: 36pt;
  font-family: "Bebas Neue", cursive;
  font-family: "Josefin Sans", sans-serif;
  font-family: "Smooch", cursive;
}
</style>
