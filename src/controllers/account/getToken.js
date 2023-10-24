import { signToken } from '../../services/jwt/tokenSignin.js'

export const getToken = (user) => {
  const dataToken = payload(user)
  const token = signToken(dataToken)
  return token
}

const payload = (data) => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.idRole
  }
}
