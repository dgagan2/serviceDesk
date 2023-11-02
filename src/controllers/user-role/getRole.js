/* eslint-disable no-useless-catch */
import prisma from '../../config/prismaInitialize.js'

export const getRoleByName = async (req, res) => {
  const { nameRole } = req.query
  if (!nameRole) return res.status(500).json({ message: 'Nombre del rol vacio' })

  try {
    const role = await searchRole(nameRole)
    if (role) {
      res.status(200).json(role)
    } else {
      res.status(404).json({ message: 'No se encontro el rol' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export const getRoleById = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Empty role ID' })

  try {
    const role = await searchRoleId(id)
    if (role) {
      res.status(200).json(role)
    } else {
      res.status(404).json({ message: 'Role not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export const searchRoleId = async (id) => {
  const idRole = Number(id)
  try {
    const role = await prisma.roleUser.findUnique({
      where: {
        idRole
      }
    })
    return role
  } catch (error) {
    throw error
  }
}
export const searchRole = async (nameRole) => {
  const exist = await prisma.roleUser.findMany({
    where: {
      nameRole: {
        contains: nameRole,
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

export const getAllRole = async (req, res) => {
  try {
    const role = await prisma.roleUser.findMany({})
    res.status(200).json(role)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
