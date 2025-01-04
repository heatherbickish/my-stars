import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";
import { Member } from "@/models/Member.js";
import { Group } from "@/models/Group.js";

class MembersService {
  async createMember(memberData) {
    const response = await api.post('api/members', memberData);
    const member = new Member(response.data);
    AppState.members.push(member);
    AppState.activeGroup.memberCount += 1
  }

  async deleteMember(memberId) {
    await api.delete(`api/members/${memberId}`);
    const memberIndex = AppState.joinedGroups.findIndex(joinedGroup => joinedGroup.id == memberId);
    AppState.joinedGroups.splice(memberIndex, 1);
    const memberIndex1 = AppState.members.findIndex(member => member.id == memberId);
    AppState.members.splice(memberIndex1, 1);
    AppState.activeGroup.memberCount -= 1;
  }

  async getMyJoinedGroups() {
    AppState.joinedGroups = [];
    if (AppState.account == null) return;
    const response = await api.get('account/members');
    const members = response.data.map(member => new Member(member));
    AppState.joinedGroups = members;
  }

  async getMembersByGroupId(groupId) {
    const response = await api.get(`api/groups/${groupId}/members`);
    // console.log(response.data);
    const members = response.data.map(member => new Member(member));
    AppState.members = members;
    // console.log(AppState.members)
  }

  async getGroupsByProfileId(profileId) {
    const response = await api.get(`api/profiles/${profileId}/members`);
    const groups = response.data.map(member => new Group(member.group));
    AppState.groups = groups;
}
}
export const membersService = new MembersService();
