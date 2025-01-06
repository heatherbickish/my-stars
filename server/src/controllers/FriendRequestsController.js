import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { friendRequestsService } from "../services/FriendRequestsService";

export class FriendRequestsController extends BaseController {
  constructor() {
    super('api/friendrequests')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createFriendRequest)
      .delete('/:friendRequestId', this.deleteFriendRequest)
      .put('/:friendRequestId', this.updateFriendRequest)
  }

  async createFriendRequest(request, response, next) {
    try {
      const requestData = request.body
      const friendRequest = await friendRequestsService.createFriendRequest(requestData)
      response.send(friendRequest)
    } catch (error) {
      next(error)
    }
  }

  async deleteFriendRequest(request, response, next){
    try{
      const friendRequestId = request.params.friendRequestId;
      const userId = request.userInfo.id;
      const message = await friendRequestsService.deleteFriendRequest(friendRequestId, userId);
      response.send(message);
    }catch (error) {
      next(error)
    }
  }

  async updateFriendRequest(request, response, next){
    try{
      const friendRequestId = request.params.friendRequestId;
      const userId = request.userInfo.id;
      const updatedRequest= await friendRequestsService.updateFriendRequest(friendRequestId, userId);
      response.send(updatedRequest);
    }catch (error) {
      next(error)
    }
  }
}
