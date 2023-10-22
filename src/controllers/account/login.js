import bcrypt from 'bcrypt'
import validateExistsEmail from '../../utils/validateExistsEmail.js'
import prisma from '../../config/prismaInitialize.js'
import { signToken } from '../../services/jwt/tokenSignin.js'

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await validateExistsEmail(email)
    if (!user) return res.status(404).json({ message: 'Usuario o Contraseña incorrectos' })
    const equalPassword = await validateEqualPasswords(password, user.password, res)
    if (!equalPassword) return res.status(401).json({ message: 'Usuario o Contraseña incorrectos' })
    const isActive = await validateRoleIsActive(user.idRole)
    if (!isActive) return res.status(401).json({ message: 'Usuario Deshabilitado' })
    delete user.password
    const dataToken = payload(user)
    const token = signToken(dataToken)
    res.status(200).json(user, token)
  } catch (error) {
    res.status(500).json({ message: 'Usuario o Contraseña incorrectos', error })
  }
}

const validateEqualPasswords = async (passwordSent, storedPassword, res) => {
  const equalPassword = await bcrypt.compare(passwordSent, storedPassword)
  return equalPassword
}

const validateRoleIsActive = async (idRole, res) => {
  if (!idRole) return false
  try {
    const role = await prisma.roleUser.findUnique({
      where: {
        idRole
      }
    })
    return role === 'active'
  } catch (error) {
    console.error(Error)
    return false
  }
}

const payload = (data) => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.idRole
  }
}
