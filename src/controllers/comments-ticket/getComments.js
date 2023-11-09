import prisma from '../../config/prismaInitialize.js'

export const getComments = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Numero del ticket vacio' })
  try {
    const comments = await prisma.comment.findMany({
      where: {
        numberTicket: Number(id)
      },
      include: {
        person: {
          select: {
            name: true
          }
        }
      }
    })
    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
