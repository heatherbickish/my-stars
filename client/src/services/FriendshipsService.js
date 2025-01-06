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

}
export const friendshipsService = new FriendshipsService();
