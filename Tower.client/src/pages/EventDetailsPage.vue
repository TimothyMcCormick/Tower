<template>
  <div class="container-fluid">
    <div class="row align-items-center m-2 elevation-2 bg-main">
      <div class="col-md-4">
        <img
          v-if="activeEvent.isCanceled == false"
          class="img-fluid"
          :src="activeEvent.coverImg"
          alt=""
        />
        <img
          v-else
          class="img-fluid"
          src="https://nyia.org/wp-content/uploads/2020/03/NYIA_General_Event_Canceled_Sign-01.png"
          alt=""
        />
      </div>
      <div class="col-md-8">
        <div class="d-flex justify-content-center">
          <button
            v-if="activeEvent.creatorId == account.id"
            class="btn btn-danger m-2"
            @click="cancelEvent"
            :disabled="activeEvent.isCanceled"
          >
            Cancel Event
          </button>
        </div>
        <div class="col-12 d-flex justify-content-between p-2">
          <div>
            <h4>{{ activeEvent.name }}</h4>
            <h5>{{ activeEvent.location }}</h5>
          </div>
          <div>
            <h4 class="text-end">{{ formatDate(activeEvent.startDate) }}</h4>
            <h5 class="text-end">{{ formatTime(activeEvent.startDate) }}</h5>
          </div>
        </div>

        <div class="col-12">
          <p>
            {{ activeEvent.description }}
          </p>
        </div>
        <div class="col-12 d-flex justify-content-between">
          <h5>{{ activeEvent.capacity + " spots left!" }}</h5>
          <button
            v-if="activeEvent.capacity > 0"
            class="btn btn-primary m-2"
            @click="getTicket"
          >
            Attend!
          </button>

          <button v-else class="btn btn-danger" disabled>Sold Out!</button>
          <!-- draw another button or element in a v-else for when the capacity is not grater than 0...disable button  -->
        </div>
      </div>
    </div>
    <div class="bg-main row filter-color text-light">
      <!-- <div v-for="t in eventTickets" :key="t.id"> -->
      <h4 class="text-center">Attendees:</h4>
      <div v-for="t in eventTickets" :key="t.id">
        <div class="d-flex justify-content-center">
          <img class="small-profile-img p-2" :src="t.account.picture" alt="" />
          <p>{{ t.account.name }}</p>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <div class="row pt-2 justify-content-center">
      <form @submit="createComment">
        <div>
          <textarea class="form-control" v-model="editable.body"></textarea>
        </div>
        <div class="m-2 d-flex justify-content-end">
          <button class="btn btn-primary" type="submit">Post Comment</button>
        </div>
      </form>
      <Comment v-for="c in comments" :key="c.id" :comment="c" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { eventsService } from "../services/EventsService"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { commentsService } from "../services/CommentsService"
export default {
  name: 'EventDetails',
  setup() {
    const route = useRoute()
    const editable = ref({ eventId: route.params.id })
    onMounted(async () => {
      try {
        logger.log(route.params)
        await eventsService.getEventDetails(route.params.id)
        await commentsService.getEventComments(route.params.id)
        await eventsService.getTicketsByEvent(route.params.id)
        // go get tickets for this event 
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }

    })
    return {
      editable,
      route,
      account: computed(() => AppState.account),
      activeEvent: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      eventTickets: computed(() => AppState.eventTickets),
      // will need a computed for the tickets
      formatDate(rawDate) {
        let time = new Date(rawDate)
        return `${time.toDateString()}`
      },
      formatTime(rawDate) {
        let time = new Date(rawDate)
        return `${time.toLocaleTimeString()}`
      },
      async getTicket() {
        try {
          await eventsService.getTicket(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async createComment() {
        try {
          await commentsService.createComment(editable.value)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async cancelEvent() {
        try {
          await eventsService.cancelEvent(route.params.id)
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
.profile-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50em;
}
.small-profile-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50em;
}
</style>