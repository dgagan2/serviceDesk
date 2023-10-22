import prisma from '../../config/prismaInitialize.js'
import { searchDepartmentId } from './getDepartment.js'

export const deleteDepartment = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Bad Request: ID is missing' })
  try {
    const idExist = await searchDepartmentId(id)
    if (!idExist) return res.status(404).json({ message: 'Department not found' })

    await deleteDepartmentFromDatabase(id, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const deleteDepartmentFromDatabase = async (idDepartment, res) => {
  const id = Number(idDepartment)
  try {
    await prisma.department.delete({
      where: {
        id
      }
    })
    res.status(200).json({ message: 'Deleted department' })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}
