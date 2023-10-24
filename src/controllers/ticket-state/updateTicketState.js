import prisma from '../../config/prismaInitialize.js'
import { searchTicketStateId } from './getTicketState.js'

export const updateTicketState = async (req, res) => {
  const { id } = req.params
  const { nameState } = req.body
  try {
    const idExist = await searchTicketStateId(id)
    if (!idExist) return res.status(404).json({ message: 'State not found' })
    if (!nameState) return res.status(400).json({ message: 'Bad Request: Name role is missing' })
    await updateStateFromDatabase(id, nameState, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const updateStateFromDatabase = async (id, nameState, res) => {
  try {
    const newState = await prisma.stateTicket.update({
      where: {
        id: Number(id)
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
