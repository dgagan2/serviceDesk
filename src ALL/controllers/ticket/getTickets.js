import prisma from '../../config/prismaInitialize.js'

export const getTicketByUser = async (req, res) => {
  const { id } = req.user
  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        person_ticket_idUserToperson: {
          id
        }
      },
      include: {
        department: {
          select: {
            id: true,
            nameDepartment: true
          }
        },
        itemService: {
          select: {
            id: true,
            nameItem: true,
            categoryService: true,
            idCategory: true
          }
        },
        person_ticket_idAgentToperson: {
          select: {
            name: true
          }
        },
        stateTicket: {
          select: {
            nameState: true
          }
        }
      }
    })
    res.status(200).json(tickets)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
