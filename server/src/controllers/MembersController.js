import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { membersService } from "../services/MembersService";

export class MembersController extends BaseController{
  constructor(){
    super('api/members')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
    .post('', this.createMember)
    .delete('/:memberId', this.deleteMember)
  }

  async createMember(request, response, next){
    try {
      const memberData = request.body;
      memberData.accountId = request.userInfo.id;
      const member = await membersService.createMember(memberData);
      response.send(member);
    } catch (error) {
      next(error);
    }
  }

  async deleteMember(request, response, next) {
    try {
      const memberId = request.params.memberId;
      const userId = request.userInfo.id;
      const message = await membersService.deleteMember(memberId, userId);
      response.send(message);
    } catch (error) {
      next(error);
    }
  }
}
