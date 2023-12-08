import { Model } from 'mongoose'

export type FullName = {
  firstName: string
  lastName: string
}

export type Address = {
  street: string
  city: string
  country: string
}

export type User = {
  userId: number
  username: string
  password: string
  fullName: FullName
  age?: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: Address
  isDeleted: boolean
}

//for creating static
export interface UserModel extends Model<User> {
  isUserExists(userId: string): Promise<User | null>
}
