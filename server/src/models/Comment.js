import { referrerPolicy } from "helmet";
import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  creatorId: { type: Schema.ObjectId, ref: 'Account'},
  postId: { type: Schema.ObjectId, ref: 'Post'},
  groupId: {type: Schema.ObjectId, ref: 'Group'},
  body: { type: String, maxLength: 1000}
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
