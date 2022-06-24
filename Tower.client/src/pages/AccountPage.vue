<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="row justify-content-center">
    <!-- make sure this component has the ability to delete the ticket -->
    <MyEvents v-for="mt in myTickets" :key="mt.id" :ticket="mt" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { accountService } from "../services/AccountService"
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      try {
        await accountService.getMyTickets()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
