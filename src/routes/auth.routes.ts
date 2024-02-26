import { Router } from "express"
import { register, login } from "../controllers/auth.controller"
import { registerSchema, loginSchema } from "../schemas/user.schema"
import { validateSchema } from "../middleware/validate-schema"

const router = Router()

router.post("/", validateSchema(registerSchema), register)
router.post("/login", validateSchema(loginSchema), login)

export { router as authRouter }