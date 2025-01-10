import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { FriendRequest } from "@/models/FriendRequest.js"
import { AppState } from "@/AppState.js"
import { Friendship } from "@/models/Friendship.js";

class FriendRequestsService {
  async getMySentOutRequests() {
    AppState.mySentOutRequests = [];
    const response = await api.get('account/sentoutrequests')
    const sentOutRequests = response.data.map(sentOutRequest => new FriendRequest(sentOutRequest));
    AppState.mySentOutRequests = sentOutRequests;
  }
  async getMyReceivedRequests() {
    AppState.receivedRequests = [];
    const response = await api.get('account/receivedfriendrequests')
    const receivedRequests = response.data.map(receivedRequest => new FriendRequest(receivedRequest));
    AppState.receivedRequests = receivedRequests;
  }
  async createFriendRequest(requestData) {
    const response = await api.post('api/friendrequests', requestData)
    const friendRequest = new FriendRequest(response.data)
    AppState.friendRequests.push(friendRequest);
    AppState.mySentOutRequests.push(friendRequest)
    return friendRequest
  }
  async rejectRequest(friendRequestId) {
    await api.delete(`api/friendrequests/${friendRequestId}`);
    const friendRequestIndex = AppState.friendRequests.findIndex(friendRequest => friendRequest.id == friendRequestId);
    AppState.friendRequests.splice(friendRequestIndex, 1);
    const friendRequestIndex1 = AppState.receivedRequests.findIndex(receivedRequest => receivedRequest.id == friendRequestId);
    AppState.receivedRequests.splice(friendRequestIndex1, 1);
  }
  async updateRequest(friendRequestId) {
    const response = await api.put(`api/friendrequests/${friendRequestId}`);
    console.log("client service output updated friendrequest:", response.data)
    const foundIndex = AppState.friendRequests.findIndex(friendRequest => friendRequest.id = friendRequestId);
    AppState.friendRequests.splice(foundIndex, 1, new FriendRequest(response.data));
    const foundIndex1 = AppState.receivedRequests.findIndex(receivedRequest => receivedRequest.id == friendRequestId);
    AppState.receivedRequests.splice(foundIndex1, 1);
  }
  async deleteRequest(friendRequestId) {
    const response = await api.delete(`api/friendrequests/${friendRequestId}`);
    console.log(response.data)
    const foundIndex = AppState.friendRequests.findIndex(friendRequest => friendRequest.id == friendRequestId);
    AppState.friendRequests.splice(foundIndex, 1);
    const foundIndex1 = AppState.mySentOutRequests.findIndex(sentOutRequest => sentOutRequest.id == friendRequestId);
    AppState.mySentOutRequests.splice(foundIndex1, 1);
}
}
export const friendRequestsService = new FriendRequestsService()
