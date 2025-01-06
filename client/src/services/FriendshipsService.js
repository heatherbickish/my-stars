import { Friendship } from "@/models/Friendship.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";
import { logger } from "@/utils/Logger.js";

class FriendshipsService{
  async createFriendship(requestData) {
    const response = await api.post('api/friendships', requestData);
    const friendship = new Friendship(response.data);
    AppState.friendships.push(friendship);
  }

  async getMyFriends() {
    AppState.myFriends = [];
    const response = await api.get('account/friends');
    logger.log(response.data);
    const myFriends = response.data.map(myFriend => new Friendship(myFriend));
    AppState.myFriends = myFriends;
  }

  async deleteFriendship(friendshipId) {
    await api.delete(`api/friendships/${friendshipId}`);
    const friendshipIndex = AppState.friendships.findIndex(friendship => friendship.id == friendshipId);
    AppState.friendships.splice(friendshipIndex, 1);
    const friendshipIndex1 = AppState.myFriends.findIndex(myFriend => myFriend.id == friendshipId);
    AppState.myFriends.splice(friendshipIndex1, 1);
  }

}
export const friendshipsService = new FriendshipsService();
