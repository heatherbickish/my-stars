export class Comment {
  constructor(data) {
    this.id = data.id
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.postId = data.postId
    this.body = data.body
    this.createdAt = new Date(data.createdAt)
    this.groupId = data.groupId;
  }
}
