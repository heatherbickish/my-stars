import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { GroupSchema } from "../models/Group";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Groups = mongoose.model('Group', GroupSchema);

}

export const dbContext = new DbContext()
