import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { friendshipsService } from "../services/FriendshipsService";

export class FriendshipsController extends BaseController{
  constructor(){
    super('api/friendships')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createFriendship)
      .delete('/:friendshipId', this.deleteFriendship)
  }
  async createFriendship(request, response,next) {
    try{
      const requestData = request.body;
      const friendship = await friendshipsService.createFriendship(requestData);
      response.send(friendship);
    }catch (error) {
      next(error);
    }
  }

  async deleteFriendship(request, response, next){
    try{
      const friendshipId = request.params.friendshipId;
      const userId = request.userInfo.id;
      const message = await friendshipsService.deleteFriendship(friendshipId, userId);
      response.send(message);
    }catch (error) {
      next(error);
    }
  }
}
