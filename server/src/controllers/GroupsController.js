import { Auth0Provider } from "@bcwdev/auth0provider";
import { groupsService } from "../services/GroupsService";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";
import { membersService } from "../services/MembersService";
import { commentsService } from "../services/CommentsService";
import { creatorEventsService } from "../services/CreatorEventsService";
import { socketProvider } from "../SocketProvider";

export class GroupsController extends BaseController {
  constructor() {
    super('api/groups')
    this.router
      .get('/:groupId/events', this.getEventByGroupId)
      .get('', this.getAllGroups)
      .get('/search', this.getGroupsByQuery)
      .get('/:groupId', this.getGroupById)
      .get('/:groupId/posts', this.getPostByGroupId)
      .get('/:groupId/members', this.getMembersByGroupId)
      .get('/:groupId/comments', this.getCommentsByGroupId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createGroup)
      .put('/:groupId', this.editGroup)
      .post('/:groupId/posts/:postId/comments', this.createComment)
      .delete('/:groupId', this.voidGroup)
  }

  async getEventByGroupId(request, response, next) {
    try {
      const groupId = request.params.groupId;
      const createdEvent = await creatorEventsService.getEventByGroupId(groupId)
      response.send(createdEvent)
    } catch (error) {
      next(error)
    }
  }

  async voidGroup(request, response, next) {
    try {
      const groupId = request.params.groupId;
      const userId = request.userInfo.id
      const group = await groupsService.voidGroup(groupId, userId)
      response.send(group)
    } catch (error) {
      next(error)
    }
  }

  async createComment(request, response, next) {
    try {
      const groupId = request.params.groupId;
      const commentData = request.body;
      const postId = commentData.postId;
      commentData.creatorId = request.userInfo.id;
      const foundGroup = await groupsService.getGroupById(groupId);
      const comment = await commentsService.createComment(commentData);
      response.send(comment);
      socketProvider.messageRoom(groupId, 'CREATED_COMMENT', comment);
    } catch (error) {
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
      next(error)
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
      socketProvider.messageAll('CREATED_GROUP', group);
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
