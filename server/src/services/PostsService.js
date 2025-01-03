import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class PostsService {
  async getPostById(postId) {
    // const post = await dbContext.Posts.findById(postId).populate('creator', 'name picture').populate('comment')
    const post = await dbContext.Posts.findById(postId).populate('creator', 'name picture')
    return post
  }
  async getPostByGroupId(groupId) {
    // const posts = await dbContext.Posts.find({ groupId: groupId }).populate('creator', 'name picture').populate('comment')
    const posts = await dbContext.Posts.find({ groupId: groupId }).populate('creator', 'name picture')
    return posts
  }
  async deletePost(postId, userId) {
    const postToDelete = await dbContext.Posts.findById(postId)
    if (postToDelete == null) { throw new Error(`Invalid post id ${postId}`) }
    if (postToDelete.creatorId != userId) { throw new Forbidden("YOU ARE NOT ALLOWED TO DELETE SOMEONE ELSE'S POST BABE") }
    await postToDelete.deleteOne()
    return 'Post has been thrown out'
  }
  async createPost(postData) {
    const post = await dbContext.Posts.create(postData)
    await post.populate('creator', 'name picture')
    // await post.populate('comment')
    return post
  }

  // async updatePost(comment, postId){
  //   const postToUpdate = await this.getPostById(postId);
  //   postToUpdate.comments.push(comment);
  //   await postToUpdate.save();
  //   return postToUpdate;
  // }

}
export const postsService = new PostsService()
