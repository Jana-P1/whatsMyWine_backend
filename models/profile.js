import mongoose from "mongoose";

const Schema = new mongoose.Schema

const profileSchema = new Schema( {
  name: String,
  avatar: String,
  wines: { type: mongoose.Schema.Types.ObjectId, ref: 'Wine' }
}, {
  timestamps: true
})

const Profile = mongoose.model("Profile", profileSchema)

export {
  Profile
}