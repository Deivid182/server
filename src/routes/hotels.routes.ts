import { Router } from "express"
import { validateSchema } from "../middleware/validate-schema"
import { newHotelSchema } from "../schemas/hotel.schema"
import { validateAuth } from "../middleware/validate-auth"
import { createHotel, getHotels } from "../controllers/hotel.controller"
import multer from "multer"

const router = Router()

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
})

router.post("/", validateAuth, upload.array("imageFiles", 6), validateSchema(newHotelSchema), createHotel)
router.get("/", validateAuth, getHotels)

export { router as hotelRouter }