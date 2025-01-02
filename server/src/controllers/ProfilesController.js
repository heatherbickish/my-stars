import { groupsService } from '../services/GroupsService.js'
import { membersService } from '../services/MembersService.js'
import { profileService } from '../services/ProfileService.js'
import BaseController from '../utils/BaseController'

export class ProfilesController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getProfiles)
      .get('/:id', this.getProfile)
      .get('/:profileId/members', this.getGroupsByProfileId)
  }

  async getProfiles(req, res, next) {
    try {
      const profiles = await profileService.findProfiles(req.query.name, req.query.offset)
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await profileService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getGroupsByProfileId(req, res, next){
    try {
      const profileId = req.params.profileId;
      const members = await membersService.getMembersByProfileId(profileId);
      res.send(members);
    } catch (error) {
      next(error)
    }
  }
}
