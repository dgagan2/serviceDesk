import express from 'express'
import { stateRoute } from './stateRoute.js'
import { roleRoute } from './roleRoute.js'
export const userRoutes = express.Router()

userRoutes.use('/state', stateRoute)
userRoutes.use('/role', roleRoute)
