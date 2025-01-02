import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";

class MembersService{
  async createMember(memberData) {
    const member = await dbContext.Members.create(memberData);
    await member.populate('profile', 'name picture');
    await member.populate('group');
    return member;
  }

  async deleteMember(memberId, userId) {
    const memberToDelete = await dbContext.Members.findById(memberId);
    if(memberToDelete == null){
      throw new Error('Invalid member Id');
    }
    if(memberToDelete.accountId != userId){
      throw new Forbidden("You are not allowed to delete this member");
    }
    await memberToDelete.deleteOne();
    return 'No longer joining that group';
  }

  async getMyMembers(userId) {
    const members = await dbContext.Members.find({accountId: userId}).populate({
      path: 'group',
      populate: [{
        path: 'creator',
        select: 'name picture'
      }]
    });
    return members;
  }

  async getMembersByGroupId(groupId) {
    const members = await dbContext.Members.find({groupId: groupId}).populate('profile', 'name picture');
    return members;
  }

  async getMembersByProfileId(profileId) {
    const members = await dbContext.Members.find({accountId: profileId}).populate('group');
    return members;
  }
}
export const membersService = new MembersService();
