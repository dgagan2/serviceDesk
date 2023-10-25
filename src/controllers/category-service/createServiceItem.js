import prisma from '../../config/prismaInitialize.js'
import { searchcategoryId } from '../category/getCategory.js'
import { searchService } from './getServiceItem.js'

// Creates a new state in the database
export const createServiceItem = async (req, res) => {
  const { nameItem, idCategory } = req.body
  if (!nameItem || !idCategory) return res.status(400).json({ message: 'Debe ingresar todos los datos' })
  try {
    if (await searchService(nameItem)) return res.status(409).json({ message: 'El servicio ya existe' })
    const existCategory = await searchcategoryId(idCategory)
    console.log('existCategory', await existCategory)
    if (!existCategory) return res.status(404).json({ message: 'La categoria no existe' })
    const newItem = await addNewService(nameItem, idCategory)
    console.log('newItem', newItem)
    res.status(201).json({ message: 'Estado creado', newItem })
  } catch (error) {
    res.status(500).json({ message: 'Something went worng', error })
  }
}

// Adds a new state to the database.
const addNewService = async (nameItem, idCategory) => {
  try {
    const service = await prisma.itemService.create({
      data: {
        nameItem,
        categoryService: {
          connect: {
            idCategory: Number(idCategory)
          }
        }
      }
    })
    console.log('service', service)
    return service
  } catch (error) {
    console.log('error', error)
    throw error
  }
}
