import prisma from '../../config/prismaInitialize.js'
import { searchDepartment } from './getDepartment.js'

export const createDepartment = async (req, res) => {
  const { nameDepartment } = req.body
  if (!nameDepartment) return res.status(404).json({ message: 'Department name is required' })
  try {
    if (await searchDepartment(nameDepartment)) return res.status(409).json({ message: 'Department already exists' })
    const newDepartment = await addDepartment(nameDepartment)
    res.status(201).json({ message: 'Created department', newDepartment })
  } catch (error) {
    res.status(500).json(error)
  }
}

const addDepartment = async (nameDepartment) => {
  try {
    const department = await prisma.department.create({
      data: {
        nameDepartment
      }
    })
    return department
  } catch (error) {
    throw new Error('Failed to create department', error)
  }
}
