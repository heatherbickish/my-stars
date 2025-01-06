import { dbContext } from "../db/DbContext";

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
}
export const friendshipsService = new FriendshipsService();
