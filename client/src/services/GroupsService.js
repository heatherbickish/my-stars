import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { Group } from "@/models/Group.js";
import { AppState } from "@/AppState.js";

class GroupsService {
  async getAllGroups() {
    const response = await api.get('api/groups');
    const groups = response.data.map(group => new Group(group));
    AppState.groups = groups;
  }

}
export const groupsService = new GroupsService();
