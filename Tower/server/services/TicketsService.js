import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"




class TicketsService {

  async getMyTickets(userInfo) {
    const myTickets = await dbContext.Tickets.find({ accountId: userInfo.id })
      .populate('event')
    return myTickets
  }

  async getTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId })
      .populate('account', 'name picture')
      .populate('event')
    return tickets
  }

  async getById(id) {
    const ticket = await dbContext.Tickets.findById(id)
    if (!ticket) {
      throw new BadRequest('invalid id')
    }
    return ticket
  }
  async create(body) {
    const event = await dbContext.Events.findById(body.eventId)
    const ticket = await dbContext.Tickets.create(body)
    if (event.capacity <= 0) {
      throw new BadRequest('This event is sold out')
    }
    // await ticket.populate('event', 'name')
    await ticket.populate('account', 'name')
    event.capacity -= 1
    await event.save()
    return ticket
  }

  async delete(ticketId, userId) {
    const ticket = await this.getById(ticketId)

    const event = await dbContext.Events.findById(ticket.eventId)
    if (ticket.accountId.toString() != userId) {
      throw new Forbidden('This is not your ticket')
    }
    ticket.remove()
    event.capacity += 1
    await event.save()
    return ticket
  }
}


export const ticketsService = new TicketsService()