import prisma from '../../config/prismaInitialize.js'

export const deleteTicket = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.ticket.delete({
      where: {
        numberTicket: Number(id)
      }
    })
    res.status(200).json({ message: 'Ticket Eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
