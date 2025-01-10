import { Friendship } from "@/models/Friendship.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";
import { logger } from "@/utils/Logger.js";

class FriendshipsService {
  async createFriendship(requestData) {
    const response = await api.post('api/friendships', requestData);
    const friendship = new Friendship(response.data);
    AppState.friendships.push(friendship);
    AppState.myFriends.push(friendship);
  }

  async getMyFriends() {
    // console.log("getting friends")

    AppState.myFriends = [];
    // if (AppState.account == null) return
    const response = await api.get('account/friends');
    // logger.log(response.data);
    const myFriends = response.data.map(myFriend => new Friendship(myFriend));
    AppState.myFriends = myFriends;
    // console.log('my friends', AppState.myFriends)
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
