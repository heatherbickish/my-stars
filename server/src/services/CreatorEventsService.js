import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class CreatorEventsService {
  async cancelEvent(eventId, userId) {
    const eventToCancel = await dbContext.CreatorEvents.findById(eventId)
    if (eventToCancel == null) { throw new Error(`Invalid event id ${eventId}`) }
    if (eventToCancel.creatorId != userId) { throw new Forbidden("YOU CANNOT CANCEL SOMEONE ELSE'S EVENT") }
    eventToCancel.isCanceled = !eventToCancel.isCanceled
    await eventToCancel.save()
    return eventToCancel
  }
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