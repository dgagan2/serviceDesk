import { departmetByName, departmentById, allDepartments, addDepartment, deleteDepartment, updateDepartment } from './department/department.resolvers.js';
import { login } from './login/auth.reslover.js';
import { RegularExpression } from 'graphql-scalars';
import { addRole, updateRole, deleteRole, allRoles, roleById, roleByName } from './user-role/userRole.resolver.js';
import { addState, allStates, deleteState, stateById, stateByName, updateState } from './user-state/userState.resolver.js';
import { allUsers, deleteUser, updateUser, userByEmail, userById, userByName } from './user/user.resolver.js';

const PasswordType = new RegularExpression('PasswordType', /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,12}$/);
const NameType = new RegularExpression('NameType', /^[a-zA-Z0-9 ]$/);

export const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    departmentById,
    departmetByName,
    allDepartments,
    roleById,
    roleByName,
    allRoles,
    stateById,
    stateByName,
    allStates,
    allUsers,
    userById,
    userByEmail,
    userByName
  },
  Mutation: {
    addDepartment,
    deleteDepartment,
    updateDepartment,
    login,
    addRole,
    updateRole,
    deleteRole,
    addState,
    updateState,
    deleteState,
    updateUser,
    deleteUser
  },
  PasswordType,
  NameType
};
