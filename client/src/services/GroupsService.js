import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Group } from "@/models/Group.js";
import { AppState } from "@/AppState.js";

class GroupsService {
  async searchGroups(searchQuery) {
    const response = await api.get(`api/groups?query=${searchQuery}`)
    // logger.log(response.data)
    const groups = response.data.map(group => new Group(group))
    AppState.groups = groups
  }
  async createGroup(groupData) {
    const response = await api.post('api/groups', groupData)
    const group = new Group(response.data)
    AppState.groups.push(group)
    return group
  }
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
