import { AppState } from "@/AppState.js";
import { Comment } from "@/models/Comment.js";
import { logger } from "@/utils/Logger.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

class CommentHandler extends SocketHandler{
  constructor(){
    super()
    this.on('CREATED_COMMENT', this.onCreatedComment)
  }
  onCreatedComment(payload){
    console.log("comment handler:", payload)
    // const comment = new Comment(payload);
    // AppState.comments.push(comment);
    let foundPost = AppState.posts.find((post) => payload.postId == post.id);
    if (foundPost) {
      foundPost.commentsArr.unshift(payload);
    }
  }
}
export const commentHandler = new CommentHandler();
