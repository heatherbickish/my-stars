import { referrerPolicy } from "helmet";
import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
  postId: { type: Schema.ObjectId, ref: 'Post', required: true },
  groupId: { type: Schema.ObjectId, ref: 'Group', required: true },
  body: { type: String, maxLength: 1000, required: true }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  })

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
