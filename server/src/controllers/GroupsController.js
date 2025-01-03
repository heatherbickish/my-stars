import { Auth0Provider } from "@bcwdev/auth0provider";
import { groupsService } from "../services/GroupsService";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";
import { membersService } from "../services/MembersService";
import { commentsService } from "../services/CommentsService";

export class GroupsController extends BaseController {
  constructor() {
    super('api/groups')
    this.router
      .get('', this.getAllGroups)
      .get('/:groupId', this.getGroupById)
      .get('/:groupId/posts', this.getPostByGroupId)
      .get('/:groupId/members', this.getMembersByGroupId)
      .get('/:groupId/comments', this.getCommentsByGroupId)
      .get('/search', this.getGroupsByQuery)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createGroup)
      .put('/:groupId', this.editGroup)
      .post('/:groupId/posts/:postId/comments', this.createComment)
  }

  async createComment(request, response, next){
    try{
      const groupId = request.params.groupId;
      const commentData = request.body;
      const postId = commentData.postId;
      commentData.creatorId = request.userInfo.id;
      const foundGroup = await groupsService.getGroupById(groupId);
      const comment = await commentsService.createComment(commentData);
      response.send(comment);
    }catch (error) {
      next(error)
    }
  }

  async getCommentsByGroupId(request, response, next) {
    try {
      const groupId = request.params.groupId;
      const comments = await commentsService.getCommentsByGroupId(groupId);
      response.send(comments);
    } catch (error) {
      next(error)
    }
  }

  async getGroupsByQuery(request, response, next) {
    try {
      const groupQuery = request.query
      const groups = await groupsService.getGroupsByQuery(groupQuery)
      response.send(groups)
    } catch (error) {

    }
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
    try {
      const groupId = request.params.groupId
      const posts = await postsService.getPostByGroupId(groupId)
      response.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getMembersByGroupId(request, response, next) {
    try {
      const groupId = request.params.groupId;
      const members = await membersService.getMembersByGroupId(groupId);
      response.send(members);
    } catch (error) {
      next(error);
    }
  }

}
