import { Account } from "./Account.js";

export class Friendship{
  constructor(data){
    this.id = data.id;
    this.userAId = data.userAId;
    this.userBId = data.userBId;
    this.profileA = data.profileA ? new Account(data.profileA) : null;
    this.profileB = data.profileB ? new Account(data.profileB) : null;
  }
}
