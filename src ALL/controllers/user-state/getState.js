/* eslint-disable no-useless-catch */
import prisma from '../../config/prismaInitialize.js'

export const getStateByName = async (req, res) => {
  const { nameState } = req.query
  if (!nameState) return res.status(500).json({ message: 'Nombre del estado vacio' })

  try {
    const state = await searchState(nameState)

    if (state) {
      res.status(200).json(state)
    } else {
      res.status(404).json({ message: 'No se encontro el estado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export const getStateById = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(500).json({ message: 'ID del estado vacio' })

  try {
    const state = await searchStateId(id)
    if (state) {
      res.status(200).json(state)
    } else {
      res.status(404).json({ message: 'No se encontro el estado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export const searchStateId = async (id) => {
  const idState = Number(id)
  try {
    const state = await prisma.stateUser.findUnique({
      where: {
        idState
      }
    })
    return state
  } catch (error) {
    throw error
  }
}
export const searchState = async (nameState) => {
  const exist = await prisma.stateUser.findMany({
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

// Retrieves all state user data from a database using Prisma ORM and returns it as a JSON response.
export const getAllState = async (req, res) => {
  try {
    const state = await prisma.stateUser.findMany({})
    return res.status(200).json(state)
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error })
  }
}

export const searchIdState = async (nameState) => {
  const state = await prisma.stateTicket.findMany({
    where: {
      nameState
    }
  })
  if (state.length > 0) {
    return state[0].id
  } else {
    return false
  }
}
