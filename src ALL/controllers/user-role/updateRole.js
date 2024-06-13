import prisma from '../../config/prismaInitialize.js'
import { searchRoleId } from './getRole.js'

export const updateRole = async (req, res) => {
  const { id } = req.params
  const { nameRole } = req.body
  try {
    const idExist = await searchRoleId(id)
    if (!idExist) return res.status(404).json({ message: 'Role not found' })
    if (!nameRole) return res.status(400).json({ message: 'Bad Request: Name role is missing' })
    await updateRoleFromDatabase(id, nameRole, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const updateRoleFromDatabase = async (id, nameRole, res) => {
  const idRole = Number(id)
  try {
    const newRole = await prisma.roleUser.update({
      where: {
        idRole
      },
      data: {
        nameRole
      }
    })
    res.status(200).json({ message: 'Rol actualizado', newRole })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo actualizar', error })
  }
}
