import prisma from '../../config/prismaInitialize.js'
import { searchStateId } from './getState.js'

export const updateState = async (req, res) => {
  const { id } = req.params
  const { nameState } = req.body
  try {
    const idExist = await searchStateId(id)
    if (!idExist) return res.status(404).json({ message: 'Estado no existe' })
    if (!nameState) return res.status(400).json({ message: 'Bad Request: Name state is missing' })
    await updateStateFromDatabase(id, nameState, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const updateStateFromDatabase = async (id, nameState, res) => {
  const idState = Number(id)
  try {
    const newState = await prisma.stateUser.update({
      where: {
        idState
      },
      data: {
        nameState
      }
    })
    res.status(200).json({ message: 'Estado actualizado', newState })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo actualizar', error })
  }
}
