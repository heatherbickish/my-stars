import { AppState } from "@/AppState.js";
import { Post } from "@/models/Post.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

class PostHandler extends SocketHandler{
  constructor(){
    super()
    this.on('CREATED_POST', this.onCreatedPost)
  }
  onCreatedPost(payload){
    const post = new Post(payload);
    AppState.posts.unshift(post);
  }
}
export const postHandler = new PostHandler();
