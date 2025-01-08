import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class PostsService {
  async getPostById(postId) {
    const post = await dbContext.Posts.findById(postId).populate('creator', 'name picture')
    return post
  }
  async getPostByGroupId(groupId) {
    const posts = await dbContext.Posts.find({ groupId: groupId })
      .populate('creator', 'name picture')
      .sort('-createdAt')
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
    return post
  }

  async likeUnlikePost(postId, userId) {
    const foundPost = await dbContext.Posts.findById(postId).populate('creator', 'name picture')
    if (foundPost.likes.length == 0) {
      foundPost.likes.push({ id: userId });
    } else {
      const index = foundPost.likes.findIndex(like => like.id == userId);
      if (index == -1) {
        foundPost.likes.push({ id: userId });
      } else {
        foundPost.likes.splice(index, 1);
      }
    }
    await foundPost.save();
    return foundPost;
  }
}
export const postsService = new PostsService()
