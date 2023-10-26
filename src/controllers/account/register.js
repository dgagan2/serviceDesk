/* eslint-disable no-var */
/* eslint-disable no-useless-catch */
import { v4 as uuidv4 } from 'uuid'
import prisma from '../../config/prismaInitialize.js'
import { encryptPassword } from '../../utils/ encryptPassword.js'
import { searchRole } from '../user-role/getRole.js'
import { searchState } from '../user-state/getState.js'

// Register new user
export const register = async (req, res) => {
  const { password, name, email } = req.body
  const id = uuidv4() // Generate an ID for the new user
  const hashPassword = await encryptPassword(password)// encrypt the password
  let idRole
  let idState
  try {
    var role = await searchRole('customer')
    var state = await searchState('disabled')
    idRole = role[0].idRole
    idState = state[0].idState
    if (!idRole || !idState) res.status(500).json({ message: 'Something went wrong' })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error })
  }

  try {
    const newUser = await createUser(id, name, email, hashPassword, idRole, idState)
    res.status(200).json({ message: 'Usuario creado', newUser })
  } catch (error) {
    return res.status(500).json({ message: 'No se creo el usuario', error })
  }
}
// It connects to the database through prism and the user is created
async function createUser (id, name, email, password, idRole, idState) {
  try {
    const newUser = await prisma.person.create({
      data: {
        id,
        name,
        email,
        password,
        department: undefined,
        roleUser: {
          connect: {
            idRole
          }
        },
        stateUser: {
          connect: {
            idState
          }
        }
      }
    })
    delete newUser.password // Remove password from object newUser before returning it
    return newUser
  } catch (error) {
    throw error
  }
}
