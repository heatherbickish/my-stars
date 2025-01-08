import { AppState } from "@/AppState.js";
import { Group } from "@/models/Group.js";
import Pop from "@/utils/Pop.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

class GroupHandler extends SocketHandler{
  constructor(){
    super()
    this.on('CREATED_GROUP', this.onCreatedGroup)
  }
  onCreatedGroup(payload){
    const group = new Group(payload);
    AppState.groups.unshift(group);
  }
}
export const groupHandler = new GroupHandler();
