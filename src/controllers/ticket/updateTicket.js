import prisma from '../../config/prismaInitialize.js'
import { searchTicketState } from '../ticket-state/getTicketState.js'

const closeTicket = async (req, res) => {
  const { numberTicket } = req.body
  if (!numberTicket) return res.status(500).json({ message: 'Empty ticket number' })
  try {
    const checkState = await searchTicketState('cerrado')
    const x = await prisma.ticket.update({
      where: {
        numberTicket
      },
      data: {
        idStateTicket: checkState[0].id
      }
    })
    if (x) {
      res.status(200).json({ message: 'Solicitud finalizada' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export { closeTicket }
