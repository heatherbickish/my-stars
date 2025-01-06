import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";

class FriendshipsService{
  async createFriendship(requestData) {
    const friendship = await dbContext.Friendships.create(requestData);
    await friendship.populate('profileA', 'name picture');
    await friendship.populate('profileB', 'name picture');
    return friendship;
  }

  async getMyFriends(userId) {
    const friendships1 = await dbContext.Friendships.find({userAId: userId}).populate('profileB', 'name picture');
    const friendships2 = await dbContext.Friendships.find({userBId: userId}).populate('profileA', 'name picture');
    let friendships = [...friendships1, ...friendships2];
    return friendships;
  }

  async deleteFriendship(friendshipId, userId) {
    const friendshipToDelete = await dbContext.Friendships.findById(friendshipId);
    if(friendshipToDelete == null) throw new Error("Invalid friendship Id");
    if((userId == friendshipToDelete.userAId) || (userId == friendshipToDelete.userBId)){
      await friendshipToDelete.deleteOne();
    }else{
        throw new Forbidden("You are not allowed to delete this friendship");
    }
    return 'Friendship deleted';
  }
}
export const friendshipsService = new FriendshipsService();
