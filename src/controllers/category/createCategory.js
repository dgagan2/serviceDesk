import prisma from '../../config/prismaInitialize.js'
import { searchCategory, searchItem } from './getCategory.js'

export const createCategory = async (req, res) => {
  const { nameCategory, idItem } = req.body
  if (!nameCategory || !idItem) return res.status(404).json({ message: 'Name or ID are required' })
  try {
    if (await searchCategory(nameCategory)) return res.status(409).json({ message: 'Category already exists' })
    const itemExist = await searchItem(idItem)
    if (!itemExist) return res.status(404).json({ message: 'Item not exists' })
    const newCategory = await addCategory(nameCategory, idItem)

    res.status(201).json({ message: 'Created category', newCategory })
  } catch (error) {
    res.status(500).json(error)
  }
}

const addCategory = async (nameCategory, idItem) => {
  try {
    const category = await prisma.categoryService.create({
      data: {
        nameCategory,
        itemService: idItem
          ? {
              connect: {
                id: Number(idItem)
              }
            }
          : undefined
      }
    })
    return category
  } catch (error) {
    throw new Error('Failed to create category', error)
  }
}
