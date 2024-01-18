import express from 'express'
import { createState } from '../controllers/user-state/createState.js'
import { getAllState, getStateById, getStateByName } from '../controllers/user-state/getState.js'
import { deleteState } from '../controllers/user-state/deleteState.js'
import { updateState } from '../controllers/user-state/updateState.js'
export const stateRoute = express.Router()

stateRoute.get('/', getAllState)
stateRoute.get('/name', getStateByName)
stateRoute.get('/:id', getStateById)
stateRoute.post('/', createState)
stateRoute.delete('/:id', deleteState)
stateRoute.patch('/:id', updateState)
