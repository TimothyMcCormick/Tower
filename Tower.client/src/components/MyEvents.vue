<template>
  <div
    class="col-md-3 elevation-2 rounded event-card text-dark m-2"
    style="width: 18rem"
  >
    <img class="img-fluid mt-2" :src="ticket.event.coverImg" alt="" />

    <h4>{{ ticket.event.name }}</h4>

    <p>{{ ticket.event.location }}</p>
    <div class="d-flex justify-content-center align-items-end">
      <button class="btn btn-danger m-2" @click="deleteTicket">
        Delete Ticket
      </button>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
export default {
  props: { ticket: { type: Object, required: true } },
  setup(props) {
    return {
      myTickets: computed(() => AppState.myTickets),
      // will need some kind of button and method to handle deleting ticket...make sure to pass down props to access the id
      async deleteTicket() {
        try {
          await eventsService.deleteTicket(props.ticket.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>