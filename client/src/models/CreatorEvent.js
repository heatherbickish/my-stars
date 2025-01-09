export class CreatorEvent {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.groupid = data.groupId
    this.title = data.title
    this.description = data.description

    this.location = data.location
  }
}