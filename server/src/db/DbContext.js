import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { PartySchema } from "../models/Party";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Party = mongoose.model('Party', PartySchema);

}

export const dbContext = new DbContext()
