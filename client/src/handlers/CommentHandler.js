import { SocketHandler } from "@/utils/SocketHandler.js";

class CommentHandler extends SocketHandler{
  constructor(){
    super()
    this.on('')
  }
}
export const commentHandler = new CommentHandler();
