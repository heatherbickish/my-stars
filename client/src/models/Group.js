export class Group {
  constructor(data) {
    this.id = data.id;
    this.creatorId = data.creatorId;
    this.name = data.name;
    this.description = data.description;
    this.coverImg = data.coverImg;
    this.memberCount = data.memberCount;
    this.joined = data.joined;
    this.isVoided = data.isVoided
  }
}
