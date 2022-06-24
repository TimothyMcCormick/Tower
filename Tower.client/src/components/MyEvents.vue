<template>
  <div
    class="col-md-3 elevation-2 rounded bg-dark m-2 selectable"
    style="width: 18rem"
  >
    <img class="img-fluid" :src="ticket.event.coverImg" alt="" />

    <h4>{{ ticket.event.name }}</h4>

    <p>{{ ticket.event.location }}</p>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: { ticket: { type: Object, required: true } },
  setup() {
    return {
      // myTickets: computed(() => AppState.myTickets)
      // will need some kind of button and method to handle deleting ticket...make sure to pass down props to access the id
    }
  }
}
</script>


<style lang="scss" scoped>
</style>