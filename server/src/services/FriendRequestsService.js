import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class FriendRequestsService {
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
    if(requestToDelete == null){
      throw new Error('Invalid friend request Id');
    }
    if(requestToDelete.receiverId != userId){
      throw new Forbidden("You are not allowed to delete this friend request");
    }
    await requestToDelete.deleteOne();
    return 'Friend request deleted';
  }
}
export const friendRequestsService = new FriendRequestsService()
