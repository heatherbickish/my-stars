import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { GroupSchema } from "../models/Group";
import { MemberSchema } from "../models/Member";
import { PostSchema } from "../models/Post";
import { CommentSchema } from "../models/Comment";
import { FriendRequestSchema } from "../models/FriendRequest";
import { FriendshipSchema } from '../models/Friendship';
import { CreatorEventSchema } from "../models/CreatorEvent";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Groups = mongoose.model('Group', GroupSchema);
  Members = mongoose.model('Member', MemberSchema);
  Posts = mongoose.model('Post', PostSchema);
  Comments = mongoose.model('Comment', CommentSchema);
  FriendRequests = mongoose.model('FriendRequest', FriendRequestSchema);
  Friendships = mongoose.model('Friendship', FriendshipSchema);
  CreatorEvents = mongoose.model('CreatorEvent', CreatorEventSchema);
}

export const dbContext = new DbContext()
