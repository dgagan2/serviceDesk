import { Strategy, ExtractJwt } from 'passport-jwt'
import dotenv from 'dotenv'

dotenv.config()

const { SECRET_KEY } = process.env
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
}

const jwtStrategy = new Strategy(options, async (payload, done) => {
  return done(null, payload)
}
)

export default jwtStrategy
