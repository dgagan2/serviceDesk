import { v4 as uuidv4 } from 'uuid'
import prisma from '../../config/prismaInitialize.js'
import { encryptPassword } from '../../utils/ encryptPassword.js'
export const register = async (req, res) => {
  const { password } = req.body
  const id = uuidv4()
  const hashPassword = await encryptPassword(password)

  try {
    const newUser = await createUser(id, req.body, hashPassword)
    res.status(200).json({ message: 'Usuario creado', newUser })
  } catch (error) {
    return res.status(500).json({ message: 'No se creo el usuario', error })
  }
}

async function createUser (id, data, password) {
  const { name, email, idDepartment, idRole, idState } = data
  const newUser = await prisma.person.create({
    data: {
      id,
      name,
      email,
      password,
      department: idDepartment
        ? {
            connect: {
              id: idDepartment
            }
          }
        : undefined,
      roleUser: idRole
        ? {
            connect: {
              idRole
            }
          }
        : undefined,
      stateUser: idState
        ? {
            connect: {
              idState
            }
          }
        : undefined
    }
  })
  delete newUser.password
  return newUser
}
