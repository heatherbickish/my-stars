import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Group } from "@/models/Group.js";
import { AppState } from "@/AppState.js";

class GroupsService {
  async getGroupById(groupId) {
    const response = await api.get(`api/groups/${groupId}`)
    const group = new Group(response.data)
    AppState.activeGroup = group
  }
  async getAllGroups() {
    const response = await api.get('api/groups');
    const groups = response.data.map(group => new Group(group));
    AppState.groups = groups;
  }

}
export const groupsService = new GroupsService();
