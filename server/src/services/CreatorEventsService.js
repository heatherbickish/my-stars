import { dbContext } from "../db/DbContext"

class CreatorEventsService {
  async createEvent(eventData) {
    const creatorEvent = await dbContext.CreatorEvents.create(eventData)
    return creatorEvent
  }

}
export const creatorEventsService = new CreatorEventsService()