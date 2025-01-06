import { Schema } from "mongoose";

export const FriendshipSchema = new Schema({
  userAId: {type: Schema.ObjectId, required: true},
  userBId: {type: Schema.ObjectId, required: true}
},
{
  timestamps: true,
  toJSON: { virtuals: true }
});
FriendshipSchema.virtual('profileA', {
  localField: 'userAId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
});
FriendshipSchema.virtual('profileB', {
  localField: 'userBId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
});
