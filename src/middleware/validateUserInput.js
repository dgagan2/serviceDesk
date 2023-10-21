import validateEmail from '../utils/validateEmail.js'
import validateExistsEmail from '../utils/validateExistsEmail.js'
import validatePassword from '../utils/validatePassword.js'

// Validates user input for login.
export const validateUserInput = (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' })
  if (!validateEmail(email)) return res.status(400).json({ message: 'Correo no valido' })
  if (!validatePassword(password)) return res.status(400).json({ message: 'Contraseña no valida' })
  next()
}

// Validates user input for registration.
export const validateUserInputRegister = async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(500).json({ message: 'Campos obligatorios vacios' })
  try {
    const existsEmail = await validateExistsEmail(email)// Validates if the email exists and return a message.
    if (existsEmail) return res.status(400).json({ message: 'Usuario ya existe' })
    validateUserInput(req, res, next) // Validates if email and password meet the requirements
  } catch (error) {
    res.status(500).json({ message: 'No se pudo validar el correo', error })
  }
}
