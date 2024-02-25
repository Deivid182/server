import { Request, Response } from "express"
import User from "../models/user"
import jwt from "jsonwebtoken"

//todo: type the request with zod schemas
export const register = async (req: Request, res: Response) => {
  try {
    const userFound = await User.findOne({ email: req.body.email })
    if(userFound) {
      return res.status(400).json({ message: "User already exists" })
    }
    const user = new User(req.body)
    await user.save()
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET!, { expiresIn: "24h" })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(201).json({
      message: "User created successfully",
      token
    })

  } catch (error) {
    console.log("REGISTER ERROR", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}