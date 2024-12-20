import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"

class GroupsService {
  async editGroup(groupId, updateData, userInfo) {
    const originalGroup = await dbContext.Groups.findById(groupId)
    if (!originalGroup) { throw new Error(`Invalid group id ${groupId}`) }
    if (userInfo != originalGroup.creatorId) { throw new Forbidden('I do not think so buddy') }
    if (updateData.description) originalGroup.description = updateData.description
    await originalGroup.save()
    return originalGroup
  }
  async getGroupById(groupId) {
    const group = await dbContext.Groups.findById(groupId)
    return group
  }
  async createGroup(groupData) {
    const group = await dbContext.Groups.create(groupData)
    return group
  }
  async getAllGroups() {
    const groups = await dbContext.Groups.find()
    return groups
  }

}
export const groupsService = new GroupsService()