export class Post {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.groupId = data.groupId
        this.imgUrl = data.imgUrl
        this.body = data.body
        this.createdAt = new Date(data.createdAt)
        this.creator = data.creator;
    }
}
