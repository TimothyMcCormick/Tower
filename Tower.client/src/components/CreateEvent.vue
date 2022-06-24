<template>
  <div>
    <form>
      <input type="text" required placeholder="name" v-model="editable.name" />
      <input
        type="text"
        required
        placeholder="description"
        v-model="editable.description"
      />
      <input
        type="text"
        required
        placeholder="image"
        v-model="editable.coverImg"
      />
      <input
        type="text"
        required
        placeholder="location"
        v-model="editable.location"
      />
      <input
        type="number"
        required
        placeholder="capacity"
        v-model="editable.capacity"
      />
      <input
        type="date"
        required
        placeholder="date"
        v-model="editable.startDate"
      />
      <input
        type="text"
        required
        placeholder="concerts, convention, sport or digital"
        v-model="editable.type"
      />

      <button class="btn btn-primary" @click="createEvent">Create!</button>
    </form>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
export default {
  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      events: computed(() => AppState.events),
      async createEvent() {
        try {
          await eventsService.createEvent(editable.value)

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