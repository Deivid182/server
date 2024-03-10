import { Schema, model } from "mongoose"

export type HotelType = {
  _id: string
  userId: string
  name: string
  city: string
  country: string
  description: string
  type: string
  adultCount: number
  childrenCount: number
  facilities: string[]
  imageUrls: string[]
  pricePerNight: number
  starRating: number
  createdAt: string
  updatedAt: string
}

const hotelSchema = new Schema<HotelType>({
  userId: {
    type: String,
    required: true 
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  adultCount: {
    type: Number,
    required: true
  },
  childrenCount: {
    type: Number,
    required: true
  },
  facilities: {
    type: [String],
    required: true
  },
  imageUrls: {
    type: [String],
    required: true
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  starRating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
})


const Hotel = model<HotelType>("Hotel", hotelSchema)

export default Hotel

