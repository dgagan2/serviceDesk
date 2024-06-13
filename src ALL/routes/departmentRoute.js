import express from 'express'
import { createDepartment } from '../controllers/department/createDepartment.js'
import { getAllDepartment, getDepartmetByName, getdepartmentById } from '../controllers/department/getDepartment.js'
import { deleteDepartment } from '../controllers/department/deleteDepartmet.js'
import { updateDepartment } from '../controllers/department/updateDepartment.js'
export const departmentRoute = express.Router()

departmentRoute.get('/', getAllDepartment)
departmentRoute.get('/name/', getDepartmetByName)
departmentRoute.get('/:id', getdepartmentById)
departmentRoute.post('/', createDepartment)
departmentRoute.delete('/:id', deleteDepartment)
departmentRoute.patch('/:id', updateDepartment)
