import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";
import { groupsService } from "../services/GroupsService";

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .delete('/:postId', this.deletePost)
  }


  async createPost(request, response, next) {
    try {
      const postData = request.body
      postData.creatorId = request.userInfo.id
      const post = await postsService.createPost(postData)
      response.send(post)
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


}