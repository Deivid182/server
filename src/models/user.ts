import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"

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

userSchema.pre("save", async function (next) {
  const user = this
  if (!user.isModified("password")) return next()
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user.password, salt)
  user.password = hash
  next()
})

const User = model<UserType>("User", userSchema)

export default User

