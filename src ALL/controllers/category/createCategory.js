import prisma from '../../config/prismaInitialize.js'
import { searchCategory } from './getCategory.js'

export const createCategory = async (req, res) => {
  const { nameCategory } = req.body
  if (!nameCategory) return res.status(404).json({ message: 'Name or ID are required' })
  try {
    if (await searchCategory(nameCategory)) return res.status(409).json({ message: 'Category already exists' })
    const newCategory = await addCategory(nameCategory)

    res.status(201).json({ message: 'Created category', newCategory })
  } catch (error) {
    res.status(500).json(error)
  }
}

const addCategory = async (nameCategory) => {
  try {
    const category = await prisma.categoryService.create({
      data: {
        nameCategory
      }
    })
    return category
  } catch (error) {
    throw new Error('Failed to create category', error)
  }
}
