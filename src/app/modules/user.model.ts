import { Schema, model } from 'mongoose'
import { Address, FullName, User, UserModel } from './user/user.interface'
import bcrypt from 'bcrypt'
import config from '../config'

const fullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
})
const addressSchema = new Schema<Address>({
  street: {
    type: String,
    required: [true, 'street Name is required'],
  },
  city: {
    type: String,
    required: [true, 'city Name is required'],
  },
  country: {
    type: String,
    required: [true, 'country Name is required'],
  },
})

const UserSchema = new Schema<User, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

// UserSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await User.findOne({ id })

//   return existingUser
// }

// Query Middleware
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

UserSchema.post('save', function (doc, next) {
  doc.password = ''

  next()
})

// //creating a custom static method
// UserSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await User.findOne({ id })
//   return existingUser
// }

export const UserModel = model<User>('User', UserSchema)
