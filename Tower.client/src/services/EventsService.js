import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"




class EventsService {
  async getEvents() {
    const res = await api.get('api/events')
    logger.log('getting events', res.data)
    AppState.events = res.data
  }

  async getTicket(eventId) {
    const res = await api.post(`api/tickets/`, { eventId })
    logger.log('get ticket', res.data)
    AppState.tickets.push(res.data)
  }

  async getTicketsByEvent(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('getting tickets by event', res.data)
    AppState.eventTickets = res.data
  }

  async createEvent(body) {
    const res = await api.post('api/events', body)
    logger.log('creating event', res.data)
    AppState.events.unshift(res.data)
    return res.data
    // AppState.newEventId = res.data.id
  }

  async getEventDetails(id) {
    const res = await api.get(`api/events/${id}`)
    logger.log(res.data)
    AppState.activeEvent = res.data
  }
  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    logger.log('deleting event', res.data)
  }
  async deleteTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    logger.log('deleting ticket', res.data)
    AppState.myTickets = AppState.myTickets.filter(mt => mt.id != mt)
  }
}



export const eventsService = new EventsService()