import express from 'express'
import logger from 'morgan'
import { routerApi } from './routes/mainRoutes.js'
import dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'
import jwtStrategy from './services/strategies/jwt.strategy.js'
dotenv.config()
const { PORT } = process.env

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(passport.initialize())
passport.use(jwtStrategy)
routerApi(app)

app.listen(PORT, () => {
  console.log(`Server is runing on PORT ${PORT}`)
})
