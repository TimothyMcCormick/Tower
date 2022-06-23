import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";




export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.create(req.body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await ticketsService.delete(req.params.id, req.userInfo.id)
      return res.send({ message: 'ticked deleted' })
    } catch (error) {
      next(error)
    }
  }
}