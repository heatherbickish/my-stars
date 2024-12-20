import { dbContext } from "../db/DbContext"

class GroupsService {
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