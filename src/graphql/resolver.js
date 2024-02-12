import { departmetByName, departmentById, allDepartments, addDepartment, deleteDepartment, updateDepartment } from './department/department.resolvers.js';
import { login } from './login/auth.reslover.js';

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    departmentById,
    departmetByName,
    allDepartments

  },
  Mutation: {
    addDepartment,
    deleteDepartment,
    updateDepartment,
    login
  }
};
