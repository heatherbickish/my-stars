import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
  }


  async createComment(request, response, next) {
    try {
      const commentData = request.body
      commentData.creatorId = request.userInfo.id
      // const comment = await commentsService.createComment(commentData)
      // const post = await postsService.updatePost(comment, commentData.postId)
      // response.send(post)
      // response.send(comment)
    } catch (error) {
      next(error)
    }
  }



}
