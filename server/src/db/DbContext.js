import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { GroupSchema } from "../models/Group";
import { MemberSchema } from "../models/Member";
import { PostSchema } from "../models/Post";
import { CommentSchema } from "../models/Comment";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Groups = mongoose.model('Group', GroupSchema);
  Members = mongoose.model('Member', MemberSchema);
  Posts = mongoose.model('Post', PostSchema);
  Comments = mongoose.model('Comment', CommentSchema);

}

export const dbContext = new DbContext()
