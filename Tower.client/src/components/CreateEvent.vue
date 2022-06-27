<template>
  <div class="p-4">
    <form>
      <div class="col-12 mt-2">
        <input
          class="form-control"
          type="text"
          required
          placeholder="name"
          v-model="editable.name"
        />
      </div>
      <div class="col-12 mt-2">
        <input
          class="form-control"
          type="text"
          required
          placeholder="description"
          v-model="editable.description"
        />
      </div>
      <div class="col-12 mt-2">
        <input
          class="form-control"
          type="text"
          required
          placeholder="image"
          v-model="editable.coverImg"
        />
      </div>
      <div class="col-12 mt-2">
        <input
          class="form-control"
          type="text"
          required
          placeholder="location"
          v-model="editable.location"
        />
      </div>
      <div class="col-12 mt-2">
        <input
          class="form-control"
          type="number"
          required
          placeholder="capacity"
          v-model="editable.capacity"
        />
      </div>
      <div class="col-12 mt-2">
        <input
          class="form-control"
          type="date"
          required
          placeholder="date"
          v-model="editable.startDate"
        />
      </div>
      <div class="col-12 mt-2">
        <input
          class="form-control"
          type="text"
          required
          placeholder="concert, convention, sport or digital"
          v-model="editable.type"
        />
      </div>
      <div class="col-12 mt-2 d-flex justify-content-center">
        <button class="btn btn-primary" @click="createEvent">Create!</button>
      </div>
    </form>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { useRoute, useRouter } from "vue-router"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const editable = ref({ eventId: route.params.id })
    return {
      editable,
      events: computed(() => AppState.events),
      // newEventId: computed(() => AppState.newEventId),
      async createEvent() {
        try {

          await eventsService.createEvent(editable.value)
          // router.push({ name: "EventDetails", params: { id: route.params.id } })
          // router push that will push me to the eventdetails page.. make sure to supply the params id from the value that is returned from the above function^^
          Pop.toast('Event Created!', 'success')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>