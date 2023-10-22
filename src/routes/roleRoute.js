import express from 'express'
import { createRole } from '../controllers/user-role/createRole.js'
import { getAllRole, getRoleById, getRoleByName } from '../controllers/user-role/getRole.js'
import { deleteRole } from '../controllers/user-role/deleteRole.js'
import { updateRole } from '../controllers/user-role/updateRole.js'
export const roleRoute = express.Router()

roleRoute.get('/', getAllRole)
roleRoute.get('/name', getRoleByName)
roleRoute.get('/:id', getRoleById)
roleRoute.post('/', createRole)
roleRoute.delete('/:id', deleteRole)
roleRoute.patch('/:id', updateRole)
