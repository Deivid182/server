import { Router } from "express"
import { register, login, getUserAuth } from "../controllers/auth.controller"
import { registerSchema, loginSchema } from "../schemas/user.schema"
import { validateSchema } from "../middleware/validate-schema"
import { validateAuth } from "../middleware/validate-auth"

const router = Router()

router.post("/", validateSchema(registerSchema), register)
router.post("/login", validateSchema(loginSchema), login)
router.get("/validate-auth", validateAuth, getUserAuth)

export { router as authRouter }