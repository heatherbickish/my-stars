export class Post {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.groupId = data.groupId
        this.imgUrl = data.imgUrl
        this.body = data.body
    }

}