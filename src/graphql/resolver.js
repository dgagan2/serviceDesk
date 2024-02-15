import { departmetByName, departmentById, allDepartments, addDepartment, deleteDepartment, updateDepartment } from './department/department.resolvers.js';
import { login } from './login/auth.reslover.js';
import { RegularExpression } from 'graphql-scalars';

const PasswordType = new RegularExpression('PasswordType', /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,12}$/);
const NameType = new RegularExpression('NameType', /^[a-zA-Z0-9 ]$/);

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
  },
  PasswordType,
  NameType
};
