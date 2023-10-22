import prisma from '../../config/prismaInitialize.js'

// Creates a new state in the database
export const createState = async (req, res) => {
  const { nameState } = req.body
  if (!nameState) return res.status(400).json({ message: 'Debe ingresar el nombre del estado' })
  try {
    if (await validateStateExist(nameState)) return res.status(409).json({ message: 'El estado ya existe' })
    const newState = await addNewState(nameState)
    res.status(201).json({ message: 'Estado creado', newState })
  } catch (error) {
    res.json(error)
  }
}

// Adds a new state to the database.
const addNewState = async (nameState) => {
  try {
    const state = await prisma.stateUser.create({
      data: {
        nameState
      }
    })
    return state
  } catch (error) {
    throw new Error('Failed to create state', error)
  }
}
// Checks if a state already exists in the database.
export const validateStateExist = async (nameState) => {
  const exist = await prisma.stateUser.findMany({
    where: {
      nameState: {
        equals: nameState,
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
