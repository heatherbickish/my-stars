import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Comment } from "@/models/Comment.js"
import { logger } from "@/utils/Logger.js";

class CommentsService {
  async deleteComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    logger.log(response.data)
    const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)
    AppState.comments.splice(commentIndex, 1)
    // let foundPost = AppState.posts.find((post) => postId == post.id)
    // if (foundPost) {
    //   foundPost.commentsArr.push(commentResult)
  }
  async createComment(commentData) {
    console.log(commentData.groupId, commentData.postId);
    const response = await api.post(`api/groups/${commentData.groupId}/posts/${commentData.postId}/comments`, commentData)
    const comment = new Comment(response.data);
    AppState.comments.unshift(comment);
    console.log("postId in service: ", comment.postId)
    return comment;
  }

  async getCommentsByGroupId(groupId) {
    const response = await api.get(`api/groups/${groupId}/comments`);
    const comments = response.data.map(comment => new Comment(comment));
    AppState.comments = comments;
  }

}
export const commentsService = new CommentsService()
