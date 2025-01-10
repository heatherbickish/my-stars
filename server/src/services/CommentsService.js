import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class CommentsService {
  async deleteComment(commentId, userId) {
    const commentToDelete = await dbContext.Comments.findById(commentId)
    if (commentToDelete == null) { throw new Error(`Invalid comment id ${commentId}`) }
    if (commentToDelete.creatorId != userId) { throw new Forbidden("YOU ARE NOT ALLOWED TO DELETE SOMEONE ELSE'S COMMENT BRAH") }
    await commentToDelete.deleteOne()
    return 'Comment has been extinguished'
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async getCommentsByGroupId(groupId) {
    const comments = await dbContext.Comments.find({ groupId: groupId }).populate('creator', 'name picture').sort('-createdAt')
    return comments;
  }

  async getCommentsByPostId(postId) {
    const comments = await dbContext.Comments.find({postId: postId}).populate('creator', 'name picture').sort('-createdAt');
    return comments;
  }

}
export const commentsService = new CommentsService()
