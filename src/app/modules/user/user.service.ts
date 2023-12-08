import { UserModel } from '../user.model'
import { User } from './user.interface'

const createUserIntoDB = async (userData: User) => {
  // const result = await UserModel.create(user)

  const user = new UserModel(userData)
  const result = await user.save()
  return result
}

const getAllUsersFromDB = async () => {
  const result = await UserModel.find()
  return result
}
const getSingleUsersFromDB = async (id: string): Promise<User | null> => {
  const result = await UserModel.findOne({ userId: id })
  return result
}

// const updateUser = async (id: string, userData: User): Promise<User | null> => {
//   const result = await UserModel.findByIdAndUpdate(id, userData, {
//     new: true,
//     runValidators: true,
//   })

  return result
}

// const deleteUser = async (id: string) => {
//   const result = await UserModel.updateOne({ id }, { isDeleted: true })
//   return result
// }

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
  updateUser,
  deleteUser,
}
