import { Schema } from "mongoose";

export const PartySchema = new Schema({
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
  name: { type: String, minLength: 3, maxLength: 50, required: true },
  description: { type: String, minLength: 15, maxLength: 1000, required: true },
  coverImg: { type: String, maxLength: 2000, required: true },
  location: { type: String, minLength: 1, maxLength: 500, required: true },
  capacity: { type: Number, min: 1, max: 5000, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false }
},
  {
    timestamps: true,
    toJSON: { virtuals: true }
  })