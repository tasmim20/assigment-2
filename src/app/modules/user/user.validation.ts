import { z } from 'zod'

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})

const addressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
})

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: fullNameValidationSchema,
  age: z.number().optional(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string().min(1)),
  address: addressValidationSchema,
  isDeleted: z.boolean(),
})

export const UserValidationSchema = userValidationSchema
