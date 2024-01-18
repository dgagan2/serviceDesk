import prisma from '../../config/prismaInitialize.js'
import { searchStateId } from './getState.js'

export const deleteState = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Bad Request: ID is missing' })
  try {
    const idExist = await searchStateId(id)
    if (!idExist) return res.status(404).json({ message: 'Estado no existe' })

    await deleteStateFromDatabase(id, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const deleteStateFromDatabase = async (id, res) => {
  const idState = Number(id)
  try {
    await prisma.stateUser.delete({
      where: {
        idState
      }
    })
    res.status(200).json({ message: 'Estado eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}
