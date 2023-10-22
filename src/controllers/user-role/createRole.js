import prisma from '../../config/prismaInitialize.js'
import { searchRole } from './getRole.js'

// Creates a new state in the database
export const createRole = async (req, res) => {
  const { nameRole } = req.body
  if (!nameRole) return res.status(400).json({ message: 'Debe ingresar el nombre del Rol' })
  try {
    if (await searchRole(nameRole)) return res.status(409).json({ message: 'El rol ya existe' })
    const newState = await addNewRole(nameRole)

    res.status(201).json({ message: 'Rol creado', newState })
  } catch (error) {
    res.json(error)
  }
}

// Adds a new state to the database.
const addNewRole = async (nameRole) => {
  try {
    const role = await prisma.roleUser.create({
      data: {
        nameRole
      }
    })
    return role
  } catch (error) {
    throw new Error('Failed to create role', error)
  }
}
