<template>
  <main>
    <Navbar />
    <router-view class="bg-color" />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.bg-main {
  background-color: whitesmoke;
}
.filter-color {
  background-color: #0a1612;
}

.nav-color {
  background-color: #1a2930;
}
.event-card {
  background-color: white;
}
</style>
