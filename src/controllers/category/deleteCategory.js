import prisma from '../../config/prismaInitialize.js'
import { searchcategoryId } from './getCategory.js'

export const deleteCategory = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Bad Request: ID is missing' })
  try {
    const idExist = await searchcategoryId(id)
    if (!idExist) return res.status(404).json({ message: 'Category not found' })

    await deleteCategoryFromDatabase(id, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const deleteCategoryFromDatabase = async (idCategory, res) => {
  try {
    await prisma.categoryService.delete({
      where: {
        idCategory: Number(idCategory)
      }
    })
    res.status(200).json({ message: 'Deleted category' })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}
