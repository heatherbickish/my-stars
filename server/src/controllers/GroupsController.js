import { Auth0Provider } from "@bcwdev/auth0provider";
import { groupsService } from "../services/GroupsService";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";

export class GroupsController extends BaseController {
  constructor() {
    super('api/groups')
    this.router
      .get('', this.getAllGroups)
      .get('/:groupId', this.getGroupById)
      .get('/:groupId/posts', this.getPostByGroupId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createGroup)
      .put('/:groupId', this.editGroup)
  }


  async getAllGroups(request, response, next) {
    try {
      const groups = await groupsService.getAllGroups()
      response.send(groups)
    } catch (error) {
      next(error)
    }
  }

  async createGroup(request, response, next) {
    try {
      const groupData = request.body
      groupData.creatorId = request.userInfo.id
      const group = await groupsService.createGroup(groupData)
      response.send(group)
    } catch (error) {
      next(error)
    }
  }

  async getGroupById(request, response, next) {
    try {
      const groupId = request.params.groupId
      const group = await groupsService.getGroupById(groupId)
      response.send(group)
    } catch (error) {
      next(error)
    }
  }

  async editGroup(request, response, next) {
    try {
      const groupId = request.params.groupId
      const updateData = request.body
      const userInfo = request.userInfo
      const updatedGroup = await groupsService.editGroup(groupId, updateData, userInfo.id)
      response.send(updatedGroup)
    } catch (error) {
      next(error)
    }
  }

  async getPostByGroupId(request, response, next) {
    const groupId = request.params.groupId
    const posts = await postsService.getPostByGroupId(groupId)
    response.send(posts)
  }

}