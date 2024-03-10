import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary"
import { NewHotelSchemaType } from "../schemas/hotel.schema"
import Hotel from "../models/hotel";

export const createHotel = async (req: Request<unknown, unknown, NewHotelSchemaType>, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[]
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64")
      let dataURI = `data:${image.mimetype};base64,${b64}`
      const res = await cloudinary.uploader.upload(dataURI, {
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET!
      })
      return res.secure_url
    })
    const imageUrls = await Promise.all(uploadPromises)
    const hotel = new Hotel({
      userId: req.userId,
      name: req.body.name,
      city: req.body.city,
      country: req.body.country,
      description: req.body.description,
      type: req.body.type,
      adultCount: req.body.adultCount,
      childrenCount: req.body.childrenCount,
      facilities: req.body.facilities,
      imageUrls: imageUrls,
      pricePerNight: req.body.pricePerNight,
      starRating: req.body.starRating
    })

    await hotel.save()
    res.status(201).json({ message: "Hotel created successfully", hotel })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" })
  }
}