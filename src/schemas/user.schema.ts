import { object, string, email, minLength, Input } from "valibot"

export const registerSchema = object({
  body: object({
    firstName: string("First name must be a string", [
      minLength(3, "First name must be at least 3 characters"),
    ]),
    lastName: string("Last name must be a string", [
      minLength(3, "Last name must be at least 3 characters"),
    ]),
    email: string([
      minLength(1, "Email must be at least 3 characters"),
      email("Email must be a valid email address"),
    ]),
    password: string("Password must be a string", [
      minLength(1, 'Please enter your password.'),
      minLength(8, 'Your password must have 8 characters or more.'),
    ]),
    confirmPassword: string("Password confirmation must be a string", [
      minLength(1, 'Please enter your password.'),
      minLength(8, 'Your password must have 8 characters or more.'),
    ]),
  })
})

export const loginSchema = object({
  body: object({
    email: string([
      minLength(1, "Email is required"),
      email("Email must be a valid email address"),
    ]),
    password: string("Password must be a string", [
      minLength(1, 'Please enter your password.'),
    ]),
  })
})

export type RegisterSchemaType = Input<typeof registerSchema>["body"]

export type LoginSchemaType = Input<typeof loginSchema>["body"]