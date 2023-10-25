import express from 'express'
import { stateRoute } from './stateRoute.js'
import { roleRoute } from './roleRoute.js'
import { getAllUsers } from '../controllers/user/getUsers.js'
import { deleteUser } from '../controllers/user/deleteUser.js'
export const userRoutes = express.Router()

userRoutes.get('/all', getAllUsers)
userRoutes.delete('/:id', deleteUser)

userRoutes.use('/state', stateRoute)
userRoutes.use('/role', roleRoute)
