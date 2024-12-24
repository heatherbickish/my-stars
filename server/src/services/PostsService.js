import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class PostsService {
  async getPostByGroupId(groupId) {
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
    return post
  }

}
export const postsService = new PostsService()