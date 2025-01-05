import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { FriendRequest } from "@/models/FriendRequest.js"
import { AppState } from "@/AppState.js"

class FriendRequestsService {
  async getMyReceivedRequests() {
    AppState.receivedRequests = [];
    const response = await api.get('account/receivedfriendrequests')
    logger.log(response.data)
    const receivedRequests = response.data.map(receivedRequest => new FriendRequest(receivedRequest));
    AppState.receivedRequests = receivedRequests;
  }
  async createFriendRequest(requestData) {
    const response = await api.post('api/friendrequests', requestData)
    const friendRequest = new FriendRequest(response.data)
    AppState.friendRequests.push(friendRequest)
    console.log(response.data)
  }
  async rejectRequest(friendRequestId) {
    await api.delete(`api/friendrequests/${friendRequestId}`);
    const friendRequestIndex = AppState.friendRequests.findIndex(friendRequest => friendRequest.id == friendRequestId);
    AppState.friendRequests.splice(friendRequestIndex, 1);
    const friendRequestIndex1 = AppState.receivedRequests.findIndex(receivedRequest => receivedRequest.id == friendRequestId);
    AppState.receivedRequests.splice(friendRequestIndex1, 1);
  }
}
export const friendRequestsService = new FriendRequestsService()
