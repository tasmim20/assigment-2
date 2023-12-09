import { Request, Response } from 'express'
import { UserServices } from './user.service'

//create user
const createUser = async (req: Request, res: Response) => {
  try {
    const { users: userData } = req.body

    //data validation using zod
    // const zodParsedData = UserValidationSchema.parse(userData)

    const result = await UserServices.createUserIntoDB(userData)

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(200).json({
      success: false,
      message: error.message,
      data: error,
    })
  }
}

//get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB()

    // Filter fields for each user object
    const filteredResult = result.map((user) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }))

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: filteredResult,
    })
  } catch (err) {
    console.log(err)
  }
}

//get single users
const getSingleUsers = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const result = await UserServices.getSingleUsersFromDB(userId)
    console.log(result)

    res.status(200).json({
      status: 'success',
      message: 'Single User fetched successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

//update users
const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const { userId } = req.params
    const result = await UserServices.updateUser(userId, userData)
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

//delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserServices.deleteUser(userId)
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUsers,
  updateUser,
  deleteUser,
}
