<template>
  <div class="col-md-9 m-2 elevation-2 bg-main p-4">
    <div class="row justify-content-center">
      <div class="col-2 d-flex justify-content-center align-items-center">
        <img class="profile-img" :src="comment.creator?.picture" alt="" />
      </div>
      <div class="col-8 bg-light elevation-2">
        <h5 class="text-dark">{{ comment.creator?.name }}</h5>
        <p class="text-dark">{{ comment.body }}</p>
      </div>
      <div class="col-1 d-flex justify-content-center align-items-center">
        <i
          class="mdi mdi-delete-forever f-22 selectable"
          @click="deleteComment"
        ></i>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { commentsService } from "../services/CommentsService"
export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    return {
      comments: computed(() => AppState.comments),
      async deleteComment() {
        try {
          await commentsService.deleteComment(props.comment.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
      // set up a function to handle deleting a comment..make sure to pass down the props to access the id 
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
</style>