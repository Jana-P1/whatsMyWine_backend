import mongoose from "mongoose";

const Schema = new mongoose.Schema

const reviewSchema = new Schema ( {
  owner: {
    type: Schema.Types.ObjectId, ref: 'Profile'
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const wineSchema = new Schema( {
  owner: {
    type: Schema.Types.ObjectId, ref: 'Profile'
  },
  name: {
    type: String,
    required: true,
},
  country: {
    type: String,
    required: true,
  },
  grapeVariety: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  winery: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  recommendation: {
    type: Boolean,
    required: true,
    default: false
  },
  reviews: [reviewSchema]

}, {
  timestamps: true
})

const Wine = mongoose.model("Wine", wineSchema)

export {
  Wine
}


