import { logger } from "@/utils/Logger.js";
import { api } from "./AxiosService.js";
import { AppState } from "@/AppState.js";
import { Member } from "@/models/Member.js";

class MembersService{
  async createMember(memberData) {
    const response = await api.post('api/members', memberData);
    const member = new Member(response.data);
    AppState.members.push(member);
  }

  async deleteMember(memberId) {
    await api.delete(`api/members/${memberId}`);
    const memberIndex = AppState.joinedGroups.findIndex(joinedGroup => joinedGroup.id == memberId);
    AppState.joinedGroups.splice(memberIndex, 1);
  }

  async getMyJoinedGroups(){
    AppState.joinedGroups = [];
    const response = await api.get('account/members');
    const members = response.data.map(member => new Member(member));
    AppState.joinedGroups = members;
  }
}
export const membersService = new MembersService();
