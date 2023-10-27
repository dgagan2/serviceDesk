import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const { SECRET_KEY } = process.env

function signToken (payload) {
  return jsonwebtoken.sign(payload, SECRET_KEY)
}

function verifyToken (token) {
  return jsonwebtoken.verify(token, SECRET_KEY)
}

export { signToken, verifyToken }
