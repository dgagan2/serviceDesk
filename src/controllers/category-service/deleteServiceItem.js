import prisma from '../../config/prismaInitialize.js'
import { searchServiceId } from './getServiceItem.js'

export const deleteServiceItem = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Bad Request: ID is missing' })
  try {
    const idExist = await searchServiceId(id)
    if (!idExist) return res.status(404).json({ message: 'Service not found' })

    await deleteServiceFromDatabase(id, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const deleteServiceFromDatabase = async (id, res) => {
  try {
    await prisma.itemService.delete({
      where: {
        id: Number(id)
      }
    })
    res.status(200).json({ message: 'Deleted Service' })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}
