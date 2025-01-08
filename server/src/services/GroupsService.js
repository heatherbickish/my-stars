import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class GroupsService {
  async voidGroup(groupId, userId) {
    const groupToVoid = await this.getGroupById(groupId)
    if (groupToVoid.creatorId != userId) { throw new Forbidden("YOU ARE NOT ALLOWED TO VOID SOMEONE ELSE'S GROUP") }
    groupToVoid.isVoided = !groupToVoid.isVoided
    await groupToVoid.save()
    return groupToVoid
  }
  async getGroupsByQuery(groupQuery) {
    const sortBy = groupQuery.sortBy
    const groups = await dbContext.Groups
      .find(groupQuery)
      .sort(sortBy)
      .populate('creator', 'name picture')
    delete groupQuery.sortBy
    const groupCount = await dbContext.Groups.countDocuments(groupQuery)
    const groupsResponse = {
      count: groupCount,
      results: groups
    }
  }

  async editGroup(groupId, updateData, userInfo) {
    const originalGroup = await dbContext.Groups.findById(groupId)

    if (!originalGroup) { throw new Error(`Invalid group id ${groupId}`) }
    if (userInfo != originalGroup.creatorId) { throw new Forbidden("CANNOT EDIT THIS GROUP, IT DOESN'T BELONG TO YOU, BRAH") }
    if (updateData.description) originalGroup.description = updateData.description

    await originalGroup.save()
    return originalGroup
  }
  async getGroupById(groupId) {
    const group = await dbContext.Groups.findById(groupId).populate('creator', 'name picture').populate('memberCount')
    return group
  }
  async createGroup(groupData) {
    const group = await dbContext.Groups.create(groupData)
    await group.populate('creator', 'name picture')
    await group.populate('memberCount')
    return group
  }
  async getAllGroups() {
    const groups = await dbContext.Groups.find().populate('creator', 'name picture').populate('memberCount')
    return groups
  }
}
export const groupsService = new GroupsService()
