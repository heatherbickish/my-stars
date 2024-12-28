import { Account } from "./Account.js";
import { Group } from "./Group.js";

export class Member{
  constructor(data){
    this.id = data.id;
    this.accountId = data.accountId;
    this.groupId = data.groupId;
    this.group = data.group? new Group(data.group) : null;
    this.profile = data.profile? new Account(data.profile): null;
  }
}
