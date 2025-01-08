import { dbContext } from "../db/DbContext"

class CreatorEventsService {
  async getEventByGroupId(groupId) {
    const createdEvent = await dbContext.CreatorEvents.find({ groupId: groupId }).populate('creator', 'name picture')
    return createdEvent
  }
  async createEvent(eventData) {
    const creatorEvent = await dbContext.CreatorEvents.create(eventData)
    await creatorEvent.populate('creator', 'name picture')
    return creatorEvent
  }

}
export const creatorEventsService = new CreatorEventsService()