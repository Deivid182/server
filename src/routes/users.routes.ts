import { Router } from "express"
import { register } from "../controllers/users.controller"

const router = Router()

router.post("/", register)
export { router as usersRouter }