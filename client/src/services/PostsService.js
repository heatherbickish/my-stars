import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Post } from "@/models/Post.js";
import { AppState } from "@/AppState.js";

class PostsService {
    async getPostsByGroupId(groupId) {
        const response = await api.get(`api/groups/${groupId}/posts`)
        const posts = response.data.map(post => new Post(post))
        AppState.posts = posts
        return posts;
    }

    async createPost(postData) {
        const response = await api.post('api/posts', postData)
        // const post = new Post(response.data)
        // AppState.posts.unshift(post)
    }

    async deletePost(postId) {
        const response = await api.delete(`api/posts/${postId}`);
        const postIndex = AppState.posts.findIndex(post => post.id = postId);
        AppState.posts.splice(postIndex, 1);
    }

    async getPostById(postId) {
        const response = await api.get(`api/posts/${postId}`);
        console.log(response.data)
    }

    async likeUnlikePost(postId) {
        const response = await api.post(`api/posts/${postId}/like`);
        const comments = await api.get(`api/posts/${postId}/comments`);
        response.data.commentsArr = comments.data;
        const foundIndex = AppState.posts.findIndex(post => post.id == postId);
        AppState.posts.splice(foundIndex, 1, new Post(response.data));
    }

    clearPosts() {
        AppState.posts = []
    }

}
export const postsService = new PostsService()
