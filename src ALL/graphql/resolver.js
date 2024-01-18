import { departmetByName, departmentById, allDepartments } from './department/department.resolvers.js'
export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    departmentById,
    departmetByName,
    allDepartments

  }
}
