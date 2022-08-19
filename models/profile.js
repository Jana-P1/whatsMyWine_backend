import mongoose from "mongoose";

const profileSchema = new mongoose.Schema( {
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