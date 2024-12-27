import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Post } from "@/models/Post.js";
import { AppState } from "@/AppState.js";

class PostsService {
    async createPost(postData) {
        const response = await api.post('api/posts', postData)
        logger.log('Created Post', response.data)
        const post = new Post(response.data)
        AppState.posts.unshift(post)
    }


}
export const postsService = new PostsService()