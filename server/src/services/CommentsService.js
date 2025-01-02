import { dbContext } from "../db/DbContext"

class CommentsService {
  async getCommentsByGroupId(groupId) {
    const comment = await dbContext.Comments.find({})
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

}
export const commentsService = new CommentsService()