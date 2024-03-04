import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}
export const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  
  if (!req.cookies.token) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  try {
    const decoded = verify(req.cookies.token, process.env.TOKEN_SECRET!)
    req.userId = (decoded as JwtPayload).userId
    next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}
