import prisma from '../../config/prismaInitialize.js'
import { searchUserInDataBaseById } from './getUsers.js'

export const deleteUser = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Bad Request: ID is missing' })
  try {
    const idExist = await searchUserInDataBaseById(id)
    if (!idExist) return res.status(404).json({ message: 'User not found' })

    await deleteUserFromDatabase(id, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const deleteUserFromDatabase = async (id, res) => {
  try {
    await prisma.person.delete({
      where: {
        id
      }
    })
    res.status(200).json({ message: 'Deleted user' })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}
