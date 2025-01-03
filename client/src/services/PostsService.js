import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Post } from "@/models/Post.js";
import { AppState } from "@/AppState.js";

class PostsService {
    async getPostsByGroupId(groupId) {
        const response = await api.get(`api/groups/${groupId}/posts`)
        // logger.log('Got Posts by Group Id', response.data)
        const posts = response.data.map(post => new Post(post))
        AppState.posts = posts
        console.log("from get posts by groupId in service:", response.data)
        return posts;
    }

    async createPost(postData) {
        const response = await api.post('api/posts', postData)
        const post = new Post(response.data)
        AppState.posts.push(post)
    }

    async deletePost(postId) {
        const response = await api.delete(`api/posts/${postId}`);
        const postIndex = AppState.posts.findIndex(post => post.id = postId);
        AppState.posts.splice(postIndex, 1);
    }


}
export const postsService = new PostsService()
