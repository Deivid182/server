import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary"
import { HotelSchemaType, SearchHotelsSchemaType } from "../schemas/hotel.schema"
import Hotel from "../models/hotel";

export const createHotel = async (req: Request<unknown, unknown, HotelSchemaType>, res: Response) => {
  // console.log(req.files, "req.files")
  try {
    const imageFiles = req.files as Express.Multer.File[]
    const imageUrls = await uploadImages(imageFiles)
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
    console.log(error, "ERROR CREATING HOTEL")
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId })

    res.status(200).json(hotels)
  } catch (error) {
    console.log(error, "ERROR GETTING HOTELS")
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getHotelById = async (req: Request<{ hotelId: string }, unknown, unknown>, res: Response) => {
  try {
    const { hotelId } = req.params
    const hotelFound = await Hotel.findOne({
      _id: hotelId,
      userId: req.userId
    })
    if (!hotelFound) {
      return res.status(404).json({ message: "Hotel not found" })
    }

    res.status(200).json(hotelFound)

  } catch (error) {
    console.log(error, "ERROR EDITING HOTEL")
    res.status(500).json({ message: "Internal server error" })
  }
}
export const editHotel = async (req: Request<{ hotelId: string }, unknown, HotelSchemaType>, res: Response) => {
  try {
    // console.log(req.body, "req.body", req.files, "req.files", req.params.hotelId, "req.params.hotelId")
    const hotelData = req.body
    const updatedHotel = await Hotel.findOneAndUpdate({
      _id: req.params.hotelId,
      userId: req.userId,
    }, hotelData, { new: true })
    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" })
    }

    const files = req.files as Express.Multer.File[]
    const updatedImageUrls = await uploadImages(files)

    updatedHotel.imageUrls = [...(updatedHotel.imageUrls || []), ...updatedImageUrls]

    await updatedHotel.save()
    res.status(200).json({ message: "Hotel updated successfully", updatedHotel })
  } catch (error) {
    console.log(error, "ERROR EDITING HOTEL")
    res.status(500).json({ message: "Internal server error" })
  }
}

export const searchHotels = async (req: Request<unknown, unknown, unknown, SearchHotelsSchemaType>, res: Response) => {
  try {
    const query = constructSearchQuery(req.query)
    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = req.query.page ? parseInt(req.query.page) : 1;

    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments(query);

    const response = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      }
    }

    res.status(200).json(response);

  } catch (error) {
    console.log(error, "ERROR SEARCHING HOTELS")
    res.status(500).json({ message: "Internal server error" })
  }
}

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = `data:${image.mimetype};base64,${b64}`;
    const res = await cloudinary.uploader.upload(dataURI, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET!
    });
    return res.secure_url;
  });
  const imageUrls = await Promise.all(uploadPromises)
  return imageUrls
}

export interface SearchParams {
  destination?: string;
  adultCount?: string;
  childrenCount?: string;
  facilities?: string[] | string;
  types?: string[] | string;
  stars?: string[] | string;
  maxPrice?: string;
}
const constructSearchQuery = (searchParams: SearchParams) => {
  const query: any = {};

  if (searchParams.destination) {
    query.$or = [
      { city: { $regex: searchParams.destination, $options: "i" } },
      { country: { $regex: searchParams.destination, $options: "i" } },
    ]
  }

  if (searchParams.adultCount) {
    query.adultCount = {
      $gte: searchParams.adultCount
    }
  }

  if (searchParams.childrenCount) {
    query.childrenCount = {
      $gte: searchParams.childrenCount
    }
  }

  if (searchParams.facilities) {
    query.facilities = {
      $all: Array.isArray(searchParams.facilities) ? searchParams.facilities : [searchParams.facilities]
    }
  }
  if (searchParams.types) {
    query.type = {
      $in: Array.isArray(searchParams.types) ? searchParams.types : [searchParams.types]
    }
  }

  if (searchParams.stars) {
    const starRatings = Array.isArray(searchParams.stars) ?
      searchParams.stars.map((star: string) => parseInt(star)) :
      parseInt(searchParams.stars)
    query.starRating = {
      $in: starRatings
    }
  }

  if (searchParams.maxPrice) {
    query.pricePerNight = {
      $lte: parseInt(searchParams.maxPrice)
    }
  }
  return query;
}