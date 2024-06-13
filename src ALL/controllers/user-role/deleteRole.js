import prisma from '../../config/prismaInitialize.js'
import { searchRoleId } from './getRole.js'

export const deleteRole = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Bad Request: ID is missing' })
  try {
    const idExist = await searchRoleId(id)
    if (!idExist) return res.status(404).json({ message: 'Role not found' })

    await deleteRoleFromDatabase(id, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const deleteRoleFromDatabase = async (id, res) => {
  const idRole = Number(id)
  try {
    await prisma.roleUser.delete({
      where: {
        idRole
      }
    })
    res.status(200).json({ message: 'Deleted role' })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}
