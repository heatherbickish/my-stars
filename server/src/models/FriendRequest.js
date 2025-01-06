import { Schema } from "mongoose";

export const FriendRequestSchema = new Schema({
  senderId: { type: Schema.ObjectId, required: true },
  receiverId: { type: Schema.ObjectId },
  reqStatus: { type: String, enum: ['pending', 'accepted', 'rejected'], required: true, default: 'pending' }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  })

FriendRequestSchema.virtual('profile', {
  localField: 'senderId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

FriendRequestSchema.virtual('profile1', {
  localField: 'receiverId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
