<template>
  <div class="row justify-content-center m-0">
    <div class="col-12 p-2 event-card">
      <h2 class="text-center">Events. The way they should be.</h2>
    </div>
  </div>
  <div class="row m-0 justify-content-around filter-color p-2 text-light">
    <!-- each of these will need an @click that will reassign the value of our filter ref('')....will need to reassign the string -->
    <div class="col-md-2 text-center selectable" @click="filterBy = ''">
      All
    </div>
    <!-- @click filter = ''  -->
    <div class="col-md-2 text-center selectable" @click="filterBy = 'concert'">
      Concert
    </div>
    <div
      class="col-md-2 text-center selectable"
      @click="filterBy = 'convention'"
    >
      Convention
    </div>
    <div class="col-md-2 text-center selectable" @click="filterBy = 'sport'">
      Sport
    </div>
    <div class="col-md-2 text-center selectable" @click="filterBy = 'digital'">
      Digital
    </div>
  </div>
  <div class="row justify-content-around m-0">
    <Event v-for="e in filteredList" :key="e.id" :event="e" />
  </div>
</template>

<script>
import { computed, ref, onMounted, watchEffect } from "@vue/runtime-core"
import Pop from "../utils/Pop"
import { logger } from "../utils/Logger"
import { eventsService } from "../services/EventsService"
import { AppState } from "../AppState"
export default {
  name: 'Home',
  setup() {
    const filterBy = ref('')
    const filteredList = ref([])

    watchEffect(() => {
      let list = AppState.events
      if (filterBy.value) {
        list = list.filter(l => l.type == filterBy.value)
      }
      filteredList.value = list
    })
    watchEffect(async () => {
      try {
        await eventsService.getEvents()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      filterBy,
      filteredList,
      // events: computed(() => AppState.events)

    }
  }


}
</script>

<style scoped lang="scss">
</style>
