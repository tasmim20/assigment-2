import { Model } from 'mongoose'

export type TFullName = {
  firstName: string
  lastName: string
}

export type TAddress = {
  street: string
  city: string
  country: string
}

export type TUser = {
  userId: number
  username: string
  password: string
  fullName: TFullName
  age?: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TAddress
  isDeleted: boolean
}

// for creating static
export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>
}
