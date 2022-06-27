<template>
  <div
    class="col-md-3 event-card elevation-4 rounded m-2 selectable text-dark"
    @click="seeEventDetails"
    style="width: 18rem"
  >
    <img
      v-if="event.isCanceled == false"
      class="img-fluid mt-2"
      :src="event.coverImg"
      alt=""
    />
    <img
      v-else
      class="img-fluid mt-2"
      src="https://nyia.org/wp-content/uploads/2020/03/NYIA_General_Event_Canceled_Sign-01.png"
      alt=""
    />

    <h4>{{ event.name }}</h4>
    <p>{{ formatDate(event.startDate) }}</p>
    <p>{{ event.location }}</p>
    <p v-if="event.capacity > 0">{{ event.capacity + " spots left!" }}</p>
    <h5 v-if="event.capacity <= 0" class="text-center">Sold Out</h5>
  </div>
</template>


<script>
import { useRouter } from "vue-router"
import { AppState } from "../AppState"
export default {
  props: { event: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()
    return {
      seeEventDetails() {
        AppState.activeEvent = props.event;
        router.push({ name: "EventDetails", params: { id: props.event.id } })
      },
      formatDate(rawDate) {
        let time = new Date(rawDate)
        return `${time.toDateString()}`
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>