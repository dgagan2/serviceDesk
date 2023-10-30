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
      },
      include: {
        roleUser: {
          select: {
            idRole: true,
            nameRole: true
          }
        },
        stateUser: {
          select: {
            idState: true,
            nameState: true
          }
        },
        department: {
          select: {
            id: true,
            nameDepartment: true
          }
        }
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
    const user = await prisma.person.findMany({
      include: {
        roleUser: {
          select: {
            idRole: true,
            nameRole: true
          }
        },
        stateUser: {
          select: {
            idState: true,
            nameState: true
          }
        },
        department: {
          select: {
            id: true,
            nameDepartment: true
          }
        }
      }
    })

    return user
  } catch (error) {
    throw error
  }
}
