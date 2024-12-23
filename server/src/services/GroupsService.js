import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class GroupsService {

  async editGroup(groupId, updateData, userInfo) {
    const originalGroup = await dbContext.Groups.findById(groupId)

    if (!originalGroup) { throw new Error(`Invalid group id ${groupId}`) }
    if (userInfo != originalGroup.creatorId) { throw new Forbidden("CANNOT EDIT THIS GROUP, IT DOESN'T BELONG TO YOU, BRAH") }
    if (updateData.description) originalGroup.description = updateData.description

    await originalGroup.save()
    return originalGroup
  }
  async getGroupById(groupId) {
    const group = await dbContext.Groups.findById(groupId).populate('creator', 'name picture')
    // if (group == null) { throw new Error(`Invalid group id${groupId}`) }
    return group
  }
  async createGroup(groupData) {
    const group = await dbContext.Groups.create(groupData)
    await group.populate('creator', 'name picture')
    return group
  }
  async getAllGroups() {
    const groups = await dbContext.Groups.find().populate('creator', 'name picture')
    return groups
  }

}
export const groupsService = new GroupsService()