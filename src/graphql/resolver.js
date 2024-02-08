import { departmetByName, departmentById, allDepartments, addDepartment } from './department/department.resolvers.js';
export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    departmentById,
    departmetByName,
    allDepartments

  },
  Mutation: {
    addDepartment
  }
};
