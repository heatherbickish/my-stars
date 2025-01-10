import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js";
import { CreatorEvent } from "@/models/CreatorEvent.js";

class CreatorEventsService {
  async createEvent(eventData) {
    const response = await api.post('api/events', eventData)
    logger.log('created event', response.data)
    const creatorEvent = new CreatorEvent(response.data);
    AppState.creatorEvents.unshift(creatorEvent);
  }
  async getEventsByGroupId(groupId) {
    const response = await api.get(`api/groups/${groupId}/events`)
    logger.log('Got events', response.data)
    const creatorEvents = response.data.map(creatorEvent => new CreatorEvent(creatorEvent));
    AppState.creatorEvents = creatorEvents;
  }

}

export const creatorEventsService = new CreatorEventsService()