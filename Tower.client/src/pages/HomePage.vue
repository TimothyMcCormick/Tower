<template>
  <div class="container-fluid bg-secondary">
    <div class="row justify-content-center m-2">
      <div class="col-12 bg-dark p-2">
        <span><h5>Lorem, ipsum dolor.</h5></span>
        <span><h5>Lorem, ipsum dolor.</h5></span>
        <span><h5>Lorem, ipsum dolor.</h5></span>
      </div>
    </div>
    <div class="row justify-content-around bg-dark p-2 m-2">
      <!-- each of these will need an @click that will reassign the value of our filter ref('')....will need to reassign the string -->
      <div class="col-md-2">All</div>
      <!-- @click filter = ''  -->
      <div class="col-md-2">Concerts</div>
      <div class="col-md-2">Convention</div>
      <div class="col-md-2">Sport</div>
      <div class="col-md-2">Digital</div>
    </div>
    <div class="row justify-content-around">
      <Event v-for="e in events" :key="e.id" :event="e" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
export default {
  name: 'Home',
  setup() {
    // const filter = ref('')
    onMounted(async () => {
      try {
        await eventsService.getEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      events: computed(() => AppState.events)
    }
  }


}
</script>

<style scoped lang="scss">
</style>
