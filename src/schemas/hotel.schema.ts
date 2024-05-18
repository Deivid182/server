import { object, string, minLength, Input, array, optional } from "valibot"

export const hotelSchema = object({
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
    facilities: array(string("Facilities must be a string"), [
      minLength(1, "Facilities must be at least 1"),
    ]),
    pricePerNight: string("Price per night must be a number", [
      minLength(1, "Price per night must be at least 1"),
    ]),
    starRating: string("Star rating must be a number", [
      minLength(1, "Star rating must be at least 1"),
    ]),
  })
})

export const searchHotelsSchema = object({
  query: object({
    page: optional(string("Page must be a number")),
    destination: optional(string("Destination must be a string")),
    adultCount: optional(string("Adult count must be a number")),
    childrenCount: optional(string("Children count must be a number")),
    facilities: optional(array(string("Facilities must be a string"))),
    types: optional(array(string("Types must be a string"))),
    stars: optional(array(string("Stars must be a string"))),
    maxPrice: optional(string("Max price must be a number")),
    sortOption: optional(string("Sort option must be a string")),
  })
})

export type HotelSchemaType = Input<typeof hotelSchema>["body"]
export type SearchHotelsSchemaType = Input<typeof searchHotelsSchema>["query"]