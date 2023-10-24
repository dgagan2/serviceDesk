import prisma from '../../config/prismaInitialize.js'
import { searchcategoryId } from './getCategory.js'

export const updateCategory = async (req, res) => {
  const { id } = req.params
  const { nameCategory } = req.body
  try {
    const idExist = await searchcategoryId(id)
    if (!idExist) return res.status(404).json({ message: 'Category not found' })
    if (!nameCategory) return res.status(400).json({ message: 'Bad Request: Name is missing' })
    await updateCategoryFromDatabase(id, nameCategory, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const updateCategoryFromDatabase = async (idCategory, nameCategory, res) => {
  try {
    const newCategory = await prisma.categoryService.update({
      where: {
        idCategory: Number(idCategory)
      },
      data: {
        nameCategory
      }
    })
    res.status(200).json({ message: 'Updated category', newCategory })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo actualizar', error })
  }
}
