import prisma from '../../config/prismaInitialize.js'
import { searchServiceId } from './getServiceItem.js'

export const updateServiceItem = async (req, res) => {
  const { id } = req.params
  const { nameItem, itemImage } = req.body
  try {
    const idExist = await searchServiceId(id)
    if (!idExist) return res.status(404).json({ message: 'Service not found' })
    if (!nameItem) return res.status(400).json({ message: 'Bad Request: Name service is missing' })
    await updateServiceFromDatabase(id, nameItem, itemImage, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const updateServiceFromDatabase = async (id, nameItem, itemImage, res) => {
  try {
    const newService = await prisma.itemService.update({
      where: {
        id: Number(id)
      },
      data: {
        nameItem,
        itemImage
      }
    })
    res.status(200).json({ message: 'Servicio actualizado', newService })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo actualizar', error })
  }
}
