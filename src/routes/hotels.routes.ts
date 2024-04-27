import { Router } from "express"
import { validateSchema } from "../middleware/validate-schema"
import { hotelSchema } from "../schemas/hotel.schema"
import { validateAuth } from "../middleware/validate-auth"
import { createHotel, getHotels, editHotel, getHotelById } from "../controllers/hotel.controller"
import multer from "multer"

const router = Router()

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
})

router.post("/", validateAuth, upload.array("imageFiles", 6), validateSchema(hotelSchema), createHotel)
router.get("/", validateAuth, getHotels)
router.get("/:hotelId", validateAuth, getHotelById)
router.patch("/:hotelId", validateAuth, upload.array("imageFiles", 6), validateSchema(hotelSchema), editHotel)


export { router as hotelRouter }