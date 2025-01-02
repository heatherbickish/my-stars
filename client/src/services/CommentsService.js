import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Comment } from "@/models/Comment.js"

class CommentsService {
  async createComment(commentData) {
    const response = await api.post('api/comments', commentData)
    const comment = new Comment(response.data)
    AppState.comments.push(comment)
    console.log(response.data)
  }

}
export const commentsService = new CommentsService()