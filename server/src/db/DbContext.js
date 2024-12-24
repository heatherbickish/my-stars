import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { GroupSchema } from "../models/Group";
import { MemberSchema } from "../models/Member";
import { PostSchema } from "../models/Post";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Groups = mongoose.model('Group', GroupSchema);
  Members = mongoose.model('Member', MemberSchema);
  Posts = mongoose.model('Post', PostSchema);

}

export const dbContext = new DbContext()
