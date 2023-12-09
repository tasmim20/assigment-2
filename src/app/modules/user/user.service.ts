import { User } from '../user.model'
import { TUser } from './user.interface'

//CREATE USER
const createUserIntoDB = async (userData: TUser) => {
  // const result = await UserModel.create(user)

  const user = new User(userData)
  const result = await user.save()
  return result
}

//GET ALL USERS
const getAllUsersFromDB = async () => {
  const result = await User.find()
  return result
}

//GET SINGLE USERS FROM DB
const getSingleUsersFromDB = async (id: string) => {
  const result = await User.findOne({ userId: id })
  return result
}

//UPDATE USERS
const updateUser = async (id: string, payload: Partial<TUser>) => {
  const { fullName, address, hobbies, ...remainingUserData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingUserData,
  }

  if (fullName && Object.keys(fullName).length) {
    for (const [key, value] of Object.entries(fullName)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  if (address && Object.keys(address).length) {
    for (const [key, value] of Object.entries(address)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if (hobbies && Object.keys(hobbies).length) {
    for (const [key, value] of Object.entries(hobbies)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await User.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

//DELETE USERS
const deleteUser = async (id: string) => {
  const result = await User.updateOne({ id }, { isDeleted: true })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
  updateUser,
  deleteUser,
}
