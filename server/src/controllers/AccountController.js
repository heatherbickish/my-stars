import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { membersService } from '../services/MembersService'
import { friendRequestsService } from "../services/FriendRequestsService"

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.editUserAccount)
      .get('/members', this.getMyMembers)
      // .get('/friendrequest', this.getMySentRequests)
      .get('/friendrequest', this.getMyReceivedRequests)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async editUserAccount(req, res, next) {
    try {
      const accountId = req.userInfo.id
      req.body.id = accountId
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getMyMembers(req, res, next) {
    try {
      const userId = req.userInfo.id;
      const members = await membersService.getMyMembers(userId);
      res.send(members);
    } catch (error) {
      next(error);
    }
  }

  // async getMySentRequests(request, response, next) {
  //   try {
  //     const userId = request.userInfo.id
  //     const friendRequest = await friendRequestsService.getMySentRequests(userId)
  //     response.send(friendRequest)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getMyReceivedRequests(request, response, next) {
    try {
      const userId = request.userInfo.id
      const friendRequests = await friendRequestsService.getMyReceivedRequests(userId)
      response.send(friendRequests)
    } catch (error) {
      next(error)
    }
  }

}
