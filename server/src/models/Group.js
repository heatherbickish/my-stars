import { Schema } from "mongoose";

export const GroupSchema = new Schema({
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
  name: { type: String, maxLength: 50, minLength: 3, required: true },
  description: { type: String, maxLength: 1000, minLength: 15, required: true },
  coverImg: { type: String, maxLength: 2000, required: true },
  isVoided: { type: Boolean, required: true, default: false }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  })

GroupSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

GroupSchema.virtual('memberCount', {
  localField: '_id',
  ref: 'Member',
  foreignField: 'groupId',
  count: true
})
