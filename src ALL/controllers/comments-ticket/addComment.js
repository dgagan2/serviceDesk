import prisma from '../../config/prismaInitialize.js'

const addComment = async (req, res) => {
  const { id } = req.user
  const { numberTicket, descriptionComment } = req.body
  if (!id || !numberTicket || !descriptionComment) return res.status(400).json({ message: 'Campos vacios' })
  try {
    await prisma.comment.create({
      data: {
        descriptionComment,
        ticket: { connect: { numberTicket: Number(numberTicket) } },
        person: { connect: { id } }
      }
    })
    res.status(201).json({ message: 'Comentario agregado' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wront', error })
  }
}

export { addComment }
