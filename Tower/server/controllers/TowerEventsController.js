import { Auth0Provider } from "@bcwdev/auth0provider";
import { json } from "express";
import { commentsService } from "../services/CommentsService";
import { ticketsService } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";




export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/comments', this.getComments)
      .get('/:id/tickets', this.getTickets)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.cancel)
  }

  async getAll(req, res, next) {
    try {
      const towerEvents = await towerEventsService.getAll()
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getById(req.params.id)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getTickets(req.params.id)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.create(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const updated = await towerEventsService.update(req.body)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }

  async cancel(req, res, next) {
    try {
      await towerEventsService.cancel(req.params.id, req.userInfo.id)
      return res.send({ message: 'cancelled event' })
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const comments = await commentsService.getEventComments(req.params.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
}