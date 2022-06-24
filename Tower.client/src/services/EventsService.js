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

  async createEvent(body) {
    const res = await api.post('api/events', body)
    logger.log('creating event', res.data)
    AppState.events.unshift(res.data)
    // AppState.activeEvent.push(res.data)
  }

  async getEventDetails(id) {
    const res = await api.get(`api/events/${id}`)
    logger.log(res.data)
    AppState.activeEvent = res.data
  }
}



export const eventsService = new EventsService()