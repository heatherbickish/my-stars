import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { creatorEventsService } from "../services/CreatorEventsService";

export class CreatorEventsController extends BaseController {
  constructor() {
    super('api/creatorevents')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
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
}