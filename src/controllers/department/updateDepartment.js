import prisma from '../../config/prismaInitialize.js'
import { searchDepartmentId } from './getDepartment.js'

export const updateDepartment = async (req, res) => {
  const { id } = req.params
  const { nameDepartment } = req.body
  try {
    const idExist = await searchDepartmentId(id)
    if (!idExist) return res.status(404).json({ message: 'Department not found' })
    if (!nameDepartment) return res.status(400).json({ message: 'Bad Request: Name is missing' })
    await updateDepartmentFromDatabase(id, nameDepartment, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const updateDepartmentFromDatabase = async (idDepartment, nameDepartment, res) => {
  const id = Number(idDepartment)
  try {
    const newDepartment = await prisma.department.update({
      where: {
        id
      },
      data: {
        nameDepartment
      }
    })
    res.status(200).json({ message: 'Updated department', newDepartment })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo actualizar', error })
  }
}
