/* eslint-disable no-useless-catch */
import prisma from '../../config/prismaInitialize.js'

// const getUserByName = (req, res) => {
//   const { name } = req.body
// }

export const searchUserInDataBaseById = async (id) => {
  if (!id) return false
  try {
    const user = await prisma.person.findUnique({
      where: {
        id
      }
    })
    return user
  } catch (error) {
    throw error
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await searchAllUserInDataBase()
    if (users) res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

const searchAllUserInDataBase = async () => {
  try {
    const user = await prisma.person.findMany({})
    return user
  } catch (error) {
    throw error
  }
}
