import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class CommentsService {
  async getEventComments(id) {
    const res = await api.get(`api/events/${id}/comments`)
    logger.log('getting comments', res.data)
    AppState.comments = res.data
  }
  async createComment(body) {
    const res = await api.post(`api/comments`, body)
    logger.log('posting comment', res.data)

  }

  async deleteComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log(res.data)
    AppState.comments = AppState.comments.filter(c => c.id != c)
  }
}



export const commentsService = new CommentsService()