import { dbContext } from "../db/DbContext"

class FriendRequestsService {
  async getMyReceivedRequests(userId) {
    const friendRequests = await dbContext.FriendRequests.find({ receiverId: userId }).populate('profile')
    return friendRequests
  }
  // async getMySentRequests(userId) {
  //   const friendRequest = await dbContext.FriendRequests.find({}).populate('profile')
  //   return friendRequest
  // }
  async createFriendRequest(requestData) {
    const friendRequest = await dbContext.FriendRequests.create(requestData)
    await friendRequest.populate('profile', 'name picture')
    return friendRequest
  }

}
export const friendRequestsService = new FriendRequestsService()