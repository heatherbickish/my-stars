import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { creatorEventsService } from "../services/CreatorEventsService";

export class CreatorEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .delete('/:eventId', this.cancelEvent)
  }

  async createEvent(request, response, next) {
    try {
      const eventData = request.body
      eventData.creatorId = request.userInfo.id
      const creatorEvent = await creatorEventsService.createEvent(eventData)
      response.send(creatorEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userId = request.userInfo.id
      const creatorEvent = await creatorEventsService.cancelEvent(eventId, userId)
      response.send(creatorEvent)
    } catch (error) {
      next(error)
    }
  }
}