import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    // NOTE If you wish to add additional properties do so here
    bio: { type: String, maxLength: 1000 },
    coverImg: { type: String, maxLength: 2000 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
