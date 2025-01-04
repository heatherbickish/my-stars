import { dbContext } from "../db/DbContext"

class CommentsService {
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async getCommentsByGroupId(groupId) {
    const comments = await dbContext.Comments.find({groupId: groupId}).populate('creator', 'name picture');
    return comments;
  }

}
export const commentsService = new CommentsService()
