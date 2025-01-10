import { Schema } from "mongoose";
const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    required: true
  }
});


export const CreatorEventSchema = new Schema(
  {
    groupId: { type: Schema.ObjectId, ref: 'Group', required: true },
    creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
    title: { type: String, maxLength: 25, minLength: 3, required: true },
    description: { type: String, maxLength: 2000, minLength: 5, required: true },
    // startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    location: {
      type: pointSchema,
      required: true
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)

CreatorEventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})