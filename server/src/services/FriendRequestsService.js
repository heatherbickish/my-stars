import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class FriendRequestsService {

  async getSentOutRequests(userId) {
    const friendrequests = await dbContext.FriendRequests.find({ senderId: userId }).populate('profile1').populate('profile')
    return friendrequests
  }
  async getMyReceivedRequests(userId) {
    const friendRequests = await dbContext.FriendRequests.find({ receiverId: userId, reqStatus: "pending" }).populate('profile')
    return friendRequests
  }
  async createFriendRequest(requestData) {
    const friendRequest = await dbContext.FriendRequests.create(requestData)
    await friendRequest.populate('profile', 'name picture')
    return friendRequest
  }
  async deleteFriendRequest(friendRequestId, userId) {
    const requestToDelete = await dbContext.FriendRequests.findById(friendRequestId);
    if (requestToDelete == null) {
      throw new Error('Invalid friend request Id');
    }
    if (requestToDelete.receiverId != userId) {
      throw new Forbidden("You are not allowed to delete this friend request");
    }
    await requestToDelete.deleteOne();
    return 'Friend request deleted';
  }

  async updateFriendRequest(friendRequestId, userId) {
    const originalRequest = await dbContext.FriendRequests.findById(friendRequestId);
    if (!originalRequest) throw new Error('No friend request to update at this Id');
    if (originalRequest.receiverId != userId) throw new Forbidden("You are not allowed to update this friend request");
    originalRequest.reqStatus = "accepted";
    await originalRequest.save();
    return originalRequest;
  }
}
export const friendRequestsService = new FriendRequestsService()
