/* eslint-disable no-useless-catch */
import { searchDepartment } from '../../controllers/department/getDepartment.js'

// Retrieves a department by name from the database.
export const departmetByName = async (_, { departmentName }) => {
  const department = await searchDepartment(departmentName)
  return department
}

// Retrieves a department by ID from the database.
export const departmentById = (_, args) => {
  return []
}

// Retrieves all departments from the database.
export const allDepartments = () => {
  return []
}
