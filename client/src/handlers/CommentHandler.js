import { AppState } from "@/AppState.js";
import { Comment } from "@/models/Comment.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

class CommentHandler extends SocketHandler{
  constructor(){
    super()
    this.on('CREATED_COMMENT', this.onCreatedComment)
  }
  onCreatedComment(payload){
    const comment = new Comment(payload);
    AppState.comments.push(comment);
  }
}
export const commentHandler = new CommentHandler();
