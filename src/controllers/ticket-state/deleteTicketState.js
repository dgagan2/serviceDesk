import prisma from '../../config/prismaInitialize.js'
import { searchTicketStateId } from './getTicketState.js'

export const deleteTicketState = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Bad Request: ID is missing' })
  try {
    const idExist = await searchTicketStateId(id)
    if (!idExist) return res.status(404).json({ message: 'State not found' })

    await deleteStateFromDatabase(id, res)
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}

const deleteStateFromDatabase = async (id, res) => {
  try {
    await prisma.stateTicket.delete({
      where: {
        id: Number(id)
      }
    })
    res.status(200).json({ message: 'Deleted State' })
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar', error })
  }
}
