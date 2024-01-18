/* eslint-disable no-useless-catch */
import prisma from '../../config/prismaInitialize.js'

// Retrieves a department by name from the database.
export const getDepartmetByName = async (req, res) => {
  const { nameDepartment } = req.query
  if (!nameDepartment) return res.status(404).json({ message: 'Department name is required' })

  try {
    const department = await searchDepartment(nameDepartment)
    if (department) {
      res.status(200).json(department)
    } else {
      res.status(404).json({ message: 'Department not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Retrieves a department by ID from the database.
export const getdepartmentById = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Empty department ID' })

  try {
    const department = await searchDepartmentId(id)
    if (department) {
      res.status(200).json(department)
    } else {
      res.status(404).json({ message: 'Department not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Searches for a department by ID in the database.
export const searchDepartmentId = async (idDepartment) => {
  const id = Number(idDepartment)
  try {
    const department = await prisma.department.findUnique({
      where: {
        id
      }
    })
    return department
  } catch (error) {
    throw error
  }
}

// Searches for a department by name in the database.
export const searchDepartment = async (departmentName) => {
  const exist = await prisma.department.findMany({
    where: {
      departmentName: {
        contains: departmentName,
        mode: 'insensitive'
      }
    }
  })
  console.log('exist', exist)
  if (exist.length > 0) {
    return exist
  } else {
    return false
  }
}

// Retrieves all departments from the database.
export const getAllDepartment = async (req, res) => {
  try {
    const department = await prisma.department.findMany({})
    res.status(200).json(department)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
