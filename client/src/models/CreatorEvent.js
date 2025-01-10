export class Location {
  constructor(data) {
    this.type = data.type
    this.coordinates = data.coordinates
    this.id = data._id
  }

  get position() {
    return {
      lat: this.coordinates[0],
      lng: this.coordinates[1]
    }
  }
}

export class CreatorEvent {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.groupid = data.groupId
    this.title = data.title
    this.description = data.description
    this.location = new Location(data.location)
    this.startDate = new Date(data.startDate)
  }
}
