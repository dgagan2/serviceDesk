/* eslint-disable no-useless-catch */
import prisma from '../../config/prismaInitialize.js'

// Retrieves a department by name from the database.
export const getCategoryByName = async (req, res) => {
  const { nameCategory } = req.query
  if (!nameCategory) return res.status(404).json({ message: 'Category name is required' })

  try {
    const category = await searchCategory(nameCategory)
    if (category) {
      res.status(200).json(category)
    } else {
      res.status(404).json({ message: 'category not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Searches for a department by name in the database.
export const searchCategory = async (nameCategory) => {
  const exist = await prisma.categoryService.findMany({
    where: {
      nameCategory: {
        contains: nameCategory,
        mode: 'insensitive'
      }
    }
  })
  if (exist.length > 0) {
    return exist
  } else {
    return false
  }
}

// Retrieves a category by ID from the database.
export const getCategoryById = async (req, res) => {
  const { idCategory } = req.params
  if (!idCategory) return res.status(400).json({ message: 'Empty category ID' })

  try {
    const category = await searchcategoryId(idCategory)
    if (category) {
      res.status(200).json(category)
    } else {
      res.status(404).json({ message: 'Department not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Searches for a department by ID in the database.
export const searchcategoryId = async (idCategory) => {
  try {
    const category = await prisma.categoryService.findUnique({
      where: {
        idCategory: Number(idCategory)
      }
    })
    return category
  } catch (error) {
    throw error
  }
}

// Obtener categorias por item
export const getCategoryByItem = async (req, res) => {
  const { idItem } = req.query
  if (!idItem) return res.status(404).json({ message: 'Category item is required' })

  try {
    const category = await searchItem(idItem)
    if (category) {
      res.status(200).json(category)
    } else {
      res.status(404).json({ message: 'category not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Busca en la base de datos las categorias que tengan el item
export const searchItem = async (idItem) => {
  const exist = await prisma.categoryService.findUnique({
    where: {
      idItem: Number(idItem)
    }
  })
  if (exist.length > 0) {
    return exist
  } else {
    return false
  }
}

// Retrieves all departments from the database.
export const getAllCategories = async (req, res) => {
  try {
    const category = await prisma.categoryService.findMany()
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
