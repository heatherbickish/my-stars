import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";
import { groupsService } from "../services/GroupsService";
import { socketProvider } from "../SocketProvider";
import { commentsService } from "../services/CommentsService";

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('/:postId', this.getPostById)
      .get('/')
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .delete('/:postId', this.deletePost)
      .post('/:postId/like', this.likeUnlikePost)
      .get('/:postId/comments', this.getCommentsByPostId)
  }


  async createPost(request, response, next) {
    try {
      const postData = request.body
      postData.creatorId = request.userInfo.id
      const post = await postsService.createPost(postData)
      response.send(post)
      socketProvider.messageRoom(post.groupId.toString(), 'CREATED_POST', post);
    } catch (error) {
      next(error)
    }
  }

  async deletePost(request, response, next) {
    try {
      const postId = request.params.postId
      const userId = request.userInfo.id
      const message = await postsService.deletePost(postId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getPostById(request, response, next){
    try{
      const postId = request.params.postId;
      const post = await postsService.getPostById(postId);
      response.send(post);
    }catch (error) {
      next(error)
    }
  }

  async likeUnlikePost(request, response, next){
    try{
      const postId = request.params.postId;
      const userId = request.userInfo.id;
      const post = await postsService.likeUnlikePost(postId, userId);
      response.send(post);
    }catch (error) {
      next(error)
    }
  }

  async getCommentsByPostId(request, response, next){
    try{
      const postId = request.params.postId;
      const comments = await commentsService.getCommentsByPostId(postId);
      response.send(comments);
    }catch (error) {
      next(error)
    }
  }
}
