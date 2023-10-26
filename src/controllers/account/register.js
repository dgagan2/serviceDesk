/* eslint-disable no-useless-catch */
import { v4 as uuidv4 } from 'uuid'
import prisma from '../../config/prismaInitialize.js'
import { encryptPassword } from '../../utils/ encryptPassword.js'

// Register new user
export const register = async (req, res) => {
  const { password } = req.body
  const id = uuidv4() // Generate an ID for the new user
  const hashPassword = await encryptPassword(password)// encrypt the password

  try {
    const newUser = await createUser(id, req.body, hashPassword)
    res.status(200).json({ message: 'Usuario creado', newUser })
  } catch (error) {
    return res.status(500).json({ message: 'No se creo el usuario', error })
  }
}
// It connects to the database through prism and the user is created
async function createUser (id, data, password) {
  const { name, email, idDepartment, idRole, idState } = data
  try {
    const newUser = await prisma.person.create({
      data: {
        id,
        name,
        email,
        password,
        department: idDepartment
          ? {
              connect: {
                id: Number(idDepartment)
              }
            }
          : undefined,
        roleUser: idRole
          ? {
              connect: {
                idRole: Number(idRole)
              }
            }
          : undefined,
        stateUser: idState
          ? {
              connect: {
                idState: Number(idState)
              }
            }
          : undefined
      }
    })
    delete newUser.password // Remove password from object newUser before returning it
    return newUser
  } catch (error) {
    throw error
  }
}
