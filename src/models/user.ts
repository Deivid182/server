import { Schema, model } from "mongoose"

export type UserType = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

const user = model<UserType>("User", userSchema)

export default user

