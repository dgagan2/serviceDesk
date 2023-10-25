/* eslint-disable no-useless-catch */
import bcrypt from 'bcrypt'
import validateExistsEmail from '../../utils/validateExistsEmail.js'
import prisma from '../../config/prismaInitialize.js'
import { getToken } from './getToken.js'

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await AuthenticationService(email, password, res)

    const token = getToken(user)
    res.status(200).json({ user, token })
  } catch (error) {
    res.status(500).json({ message: 'Usuario o Contraseña incorrectos', error })
  }
}

// Realiza validaciones si el correo existe, la contraseña coincide y el usuario esta activo
const AuthenticationService = async (email, password, res) => {
  try {
    const user = await validateExistsEmail(email)
    if (!user) return res.status(404).json({ message: 'Usuario no existe' })
    const equalPassword = await validateEqualPasswords(password, user.password)
    if (!equalPassword) return res.status(401).json({ message: 'Usuario o Contraseña incorrectos' })
    const isActive = await validateUserIsActive(user.idState)
    console.log('isActive', isActive)
    if (!isActive) return res.status(404).json({ message: 'Usuario deshabilitado' })
    delete user.password
    return user
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

// Valida que las contraseñas sea igual
const validateEqualPasswords = async (passwordSent, storedPassword) => {
  const equalPassword = await bcrypt.compare(passwordSent, storedPassword)
  return equalPassword
}

// Valida que el usuario este activo
const validateUserIsActive = async (idState) => {
  if (!idState) return false
  try {
    const state = await prisma.stateUser.findUnique({
      where: {
        idState
      }
    })
    console.log(state.nameState === 'active')
    return state.nameState === 'active'
  } catch (error) {
    return false
  }
}
