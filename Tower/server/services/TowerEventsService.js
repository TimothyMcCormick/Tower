import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"




class TowerEventsService {

  async getAll(query = {}) {
    const towerEvents = await dbContext.Events.find(query)
    return towerEvents
  }

  async getById(id) {
    const towerEvent = await dbContext.Events.findById(id).populate('creator', 'name picture')
    if (!towerEvent) {
      throw new BadRequest('invalid id')
    }
    return towerEvent
  }

  async create(body) {
    const towerEvent = await dbContext.Events.create(body)
    if (towerEvent.startDate < new Date(Date.now())) {
      throw new BadRequest('You cannot create an event in the past Marty McFly')
    }
    return towerEvent
  }

  async update(update) {
    const original = await this.getById(update.id)
    if (original.creatorId.toString() != update.creatorId) {
      throw new Forbidden('Only the event owner can update this event')
    } else if (original.isCanceled == true) {
      throw new BadRequest('You cannot edit an event after it is cancelled')
    }

    original.name = update.name || original.name
    original.description = update.description || original.description
    original.coverImg = update.coverImg || original.coverImg
    original.location = update.location || original.location
    original.capacity = update.capacity || original.capacity
    original.startDate = update.startDate || original.startDate
    original.type = update.type || original.type

    await original.save()
    return update
  }

  async cancel(towerEventId, userId) {
    const towerEvent = await this.getById(towerEventId)
    if (towerEvent.creatorId.toString() != userId) {
      throw new Forbidden('Only the event owner can cancel this event')
    }

    towerEvent.isCanceled = true
    await towerEvent.save()

  }

}


export const towerEventsService = new TowerEventsService()