import { Router } from "express";
import { searchHotels } from "../controllers/hotel.controller";
import { validateSchema } from "../middleware/validate-schema";
import { searchHotelsSchema } from "../schemas/hotel.schema";

const router = Router();

router.get("/search", validateSchema(searchHotelsSchema), searchHotels);

export { router as hotelRouter }