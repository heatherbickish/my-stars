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


export const CreatorEventSchema = new Schema({
  creatorId: { type: Schema.ObjectId, ref: 'Account' },
  title: { type: String, maxLength: 100, minLength: 3 },
  description: { type: String, maxLength: 2000, minLength: 15 },
  location: {
    type: pointSchema,
    // required: true
  },

},
  {
    timestamps: true
  })