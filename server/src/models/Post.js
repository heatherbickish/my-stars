import { Schema } from "mongoose";

export const PostSchema = new Schema({
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
  imgUrl: { type: String, maxLength: 2000 },
  groupId: { type: Schema.ObjectId, ref: 'Group' },
  body: { type: String, minLength: 3, maxLength: 1000 },
  commentsArr: { type: [] },
  likes: {type: []}
  // location: { type: String, maxLength: 100, }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  })

PostSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
