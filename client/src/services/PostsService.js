import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Post } from "@/models/Post.js";
import { AppState } from "@/AppState.js";

class PostsService {
    async getPostsByGroupId(groupId) {
        const response = await api.get(`api/groups/${groupId}/posts`)
        logger.log('Got Posts by Group Id', response.data)
        const posts = response.data.map(post => new Post(post))
        AppState.posts = posts
    }

    async createPost(postData) {
        const response = await api.post('api/posts', postData)
        logger.log('Created Post', response.data)
        const post = new Post(response.data)
        AppState.posts.unshift(post)
    }


}
export const postsService = new PostsService()