import { Request, Response } from "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import { RegisterSchemaType, LoginSchemaType } from "../schemas/user.schema"
import bcrypt from "bcrypt"

//todo: type the request with zod schemas
export const register = async (req: Request<unknown, unknown, RegisterSchemaType>, res: Response) => {
  try {
    const userFound = await User.findOne({ email: req.body.email })
    if (userFound) {
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

    return res.status(200).json({
      message: "User created successfully",
      token
    })

  } catch (error) {
    console.log("REGISTER ERROR", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const login = async (req: Request<unknown, unknown, LoginSchemaType>, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET!, { expiresIn: "24h" })

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      message: "User logged in successfully",
      userId: user._id,
    })
  } catch (error) {
    console.log("LOGIN ERROR", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const getUserAuth = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ userId: req.userId })
  } catch (error) {
    console.log("GET USER AUTH ERROR", error)
  }
}