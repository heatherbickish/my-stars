import { Account } from "./Account.js";

export class FriendRequest {
  constructor(data) {
    this.id = data.id
    this.senderId = data.senderId
    this.receiverId = data.receiverId
    this.reqStatus = data.reqStatus
    this.profile = data.profile ? new Account(data.profile) : null;
  }
}