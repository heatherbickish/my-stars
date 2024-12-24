import { Schema } from "mongoose";

export const MemberSchema = new Schema({
  name: { type: String, maxLength: 50, required: true },
  accountId: { type: Schema.ObjectId, ref: 'Account', required: true },
  groupId: { type: Schema.ObjectId, ref: 'Group', required: true }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  });

MemberSchema.virtual('profile', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
});

MemberSchema.virtual('group', {
  localField: 'groupId',
  ref: 'Group',
  foreignField: '_id',
  justOne: true
});
