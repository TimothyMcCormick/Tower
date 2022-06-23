import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"




class CommentsService {
  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator')
    return comments
  }

  async create(body) {
    const comment = await dbContext.Comments.create(body)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async update(id, update) {
    const original = await dbContext.Comments.findById(id).populate('creator', 'name picture')
    if (original.creatorId.toString() != update.creatorId) {
      throw new BadRequest('You cannot edit a comment you did not create')
    }
    original.body = update.body || original.body
    original.towerEventId = update.towerEventId || original.towerEventId
    original.save()
    return update
  }

  async delete(id, userId) {
    const comment = await dbContext.Comments.findById(id)
    if (comment.creatorId.toString() != userId) {
      throw new BadRequest('You cannot delete a comment you did not create')
    }
    comment.remove()
    return 'deleted comment'
  }
}


export const commentsService = new CommentsService()