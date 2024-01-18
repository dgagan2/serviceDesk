/* eslint-disable no-useless-catch */

import prisma from '../../config/prismaInitialize.js'

export const getTicketStateByName = async (req, res) => {
  const { nameState } = req.query
  if (!nameState) return res.status(500).json({ message: 'Nombre del estado vacio' })

  try {
    const state = await searchTicketState(nameState)
    if (state) {
      res.status(200).json(state)
    } else {
      res.status(404).json({ message: 'No se encontro el estado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export const getTicketStateById = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Empty state ID' })

  try {
    const state = await searchTicketStateId(id)
    if (state) {
      res.status(200).json(state)
    } else {
      res.status(404).json({ message: 'State not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export const searchTicketStateId = async (id) => {
  try {
    const state = await prisma.stateTicket.findUnique({
      where: {
        id: Number(id)
      }
    })
    return state
  } catch (error) {
    throw error
  }
}
export const searchTicketState = async (nameState) => {
  const exist = await prisma.stateTicket.findMany({
    where: {
      nameState: {
        contains: nameState,
        mode: 'insensitive'
      }
    }
  })
  if (exist.length > 0) {
    return exist
  } else {
    return false
  }
}

export const getAllTicketState = async (req, res) => {
  try {
    const state = await prisma.stateTicket.findMany({})
    res.status(200).json(state)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
