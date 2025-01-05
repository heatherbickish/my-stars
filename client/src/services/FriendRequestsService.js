import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { FriendRequest } from "@/models/FriendRequest.js"
import { AppState } from "@/AppState.js"

class FriendRequestsService {
  async getMyReceivedRequests() {
    const response = await api.get('account/friendrequests')
    logger.log(response.data)
  }
  async createFriendRequest(requestData) {
    const response = await api.post('api/friendrequests', requestData)
    const friendRequest = new FriendRequest(response.data)
    AppState.friendRequests.push(friendRequest)
    console.log(response.data)
  }

}
export const friendRequestsService = new FriendRequestsService()