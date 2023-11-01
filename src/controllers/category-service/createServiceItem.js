/* eslint-disable no-useless-catch */
import prisma from '../../config/prismaInitialize.js'
import { searchcategoryId } from '../category/getCategory.js'
import { searchService } from './getServiceItem.js'

// Creates a new state in the database
export const createServiceItem = async (req, res) => {
  const { nameItem, idCategory, itemImage } = req.body
  if (!nameItem || !idCategory) return res.status(400).json({ message: 'Debe ingresar todos los datos' })
  try {
    if (await searchService(nameItem)) return res.status(409).json({ message: 'El servicio ya existe' })
    const existCategory = await searchcategoryId(idCategory)
    if (!existCategory) return res.status(404).json({ message: 'La categoria no existe' })
    const newItem = await addNewService(nameItem, idCategory, itemImage)
    res.status(201).json({ message: 'Estado creado', newItem })
  } catch (error) {
    res.status(500).json({ message: 'Something went worng', error })
  }
}

// Adds a new state to the database.
const addNewService = async (nameItem, idCategory, itemImage) => {
  try {
    const service = await prisma.itemService.create({
      data: {
        nameItem,
        itemImage,
        categoryService: {
          connect: {
            idCategory: Number(idCategory)
          }
        }
      }
    })

    return service
  } catch (error) {
    throw error
  }
}
