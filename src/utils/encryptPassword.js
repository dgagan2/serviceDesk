/* eslint-disable no-useless-catch */
import bcrypt from 'bcrypt'

export const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (error) {
    throw error
  }
}
