import jsonwebtoken from 'jsonwebtoken'

const { SECRET_KEY } = process.env

function signToken (payload) {
  return jsonwebtoken.sign(payload, SECRET_KEY)
}

async function verifyToken (token) {
  return jsonwebtoken.verify(token, SECRET_KEY)
}

export { signToken, verifyToken }
