import { object, string, email, minLength, Input } from "valibot"

export const newHotelSchema = object({
  body: object({
    name: string("Name must be a string", [
      minLength(3, "Name must be at least 3 characters"),
    ]),
    city: string("City must be a string", [
      minLength(3, "City must be at least 3 characters"),
    ]),
    country: string("Country must be a string", [
      minLength(3, "Country must be at least 3 characters"),
    ]),
    description: string("Description must be a string", [
      minLength(3, "Description must be at least 3 characters"),
    ]),
    type: string("Type must be a string", [
      minLength(3, "Type must be at least 3 characters"),
    ]),
    adultCount: string("Adult count must be a number", [
      minLength(1, "Adult count must be at least 1"),
    ]),
    childrenCount: string("Children count must be a number", [
      minLength(1, "Children count must be at least 1"),
    ]),
    facilities: string("Facilities must be a string", [
      minLength(3, "Facilities must be at least 3 characters"),
    ]),
    imageUrls: string("Image URLs must be a string", [
      minLength(3, "Image URLs must be at least 3 characters"),
    ]),
    pricePerNight: string("Price per night must be a number", [
      minLength(1, "Price per night must be at least 1"),
    ]),
    starRating: string("Star rating must be a number", [
      minLength(1, "Star rating must be at least 1"),
    ]),
  })
})


export type NewHotelSchemaType = Input<typeof newHotelSchema>["body"]