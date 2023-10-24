import prisma from '../../config/prismaInitialize.js'
import { searchTicketState } from './getTicketState.js'

// Creates a new state in the database
export const createTicketState = async (req, res) => {
  const { nameState } = req.body
  if (!nameState) return res.status(400).json({ message: 'Debe ingresar el nombre del Estado' })
  try {
    if (await searchTicketState(nameState)) return res.status(409).json({ message: 'El estado ya existe' })
    const newState = await addNewState(nameState)

    res.status(201).json({ message: 'Estado creado', newState })
  } catch (error) {
    res.json(error)
  }
}

// Adds a new state to the database.
const addNewState = async (nameState) => {
  try {
    const state = await prisma.stateTicket.create({
      data: {
        nameState
      }
    })
    return state
  } catch (error) {
    throw new Error('Failed to create role', error)
  }
}
