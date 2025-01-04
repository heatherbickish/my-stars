// import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Comment } from "@/models/Comment.js"

class CommentsService {
  async createComment(commentData) {
    console.log(commentData.groupId, commentData.postId);
    const response = await api.post(`api/groups/${commentData.groupId}/posts/${commentData.postId}/comments`, commentData)
    console.log(response.data);
    const comment = new Comment(response.data);
    AppState.comments.unshift(comment);
    return comment;
  }

  async getCommentsByGroupId(groupId) {
    const response = await api.get(`api/groups/${groupId}/comments`);
    // console.log("Get comments by group id", response.data)
    const comments = response.data.map(comment => new Comment(comment));
    AppState.comments = comments;
    // console.log("service output", comments)
    // return comments;
  }

}
export const commentsService = new CommentsService()
