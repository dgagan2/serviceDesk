import {
  departmetByName,
  departmentById,
  allDepartments,
  addDepartment,
  deleteDepartment,
  updateDepartment
} from './department/department.resolvers.js';
import { login } from './login/auth.reslover.js';
import { RegularExpression } from 'graphql-scalars';
import { addRole, updateRole, deleteRole, allRoles, roleById, roleByName } from './user-role/userRole.resolver.js';
import { addState, allStates, deleteState, stateById, stateByName, updateState } from './user-state/userState.resolver.js';
import { allUsers, deleteUser, updateUser, userByEmail, userById, userByName } from './user/user.resolver.js';
import {
  allCategories,
  addCategory,
  categoryById,
  categoryByName,
  deleteCategory,
  updateCategory
} from './serviceCategories/serviceCategory.resolvers.js';
import {
  serviceByName,
  addService,
  allServices,
  deleteService,
  serviceById,
  updateService
} from './services/service.resolvers.js';
import {
  addStatus,
  allStatus,
  deleteStatus,
  statusById,
  statusByName,
  updateStatus
} from './ticketStatus/ticketStatus.resolvers.js';

import { newTicket } from './ticket/tickets.resolvers.js';
/**
 * Represents a regular expression for validating password types.
 *
 * @type {RegularExpression}
 */
const PasswordType = new RegularExpression('PasswordType', /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,12}$/);

/**
 * Represents a regular expression for validating a name type.
 * @typedef {RegExp} NameType
 */
const NameType = new RegularExpression('NameType', /^([a-zA-Z0-9]){3,30}$/);

export const resolvers = {
  Query: {
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
    userByName,
    allCategories,
    categoryById,
    categoryByName,
    serviceByName,
    allServices,
    serviceById,
    allStatus,
    statusById,
    statusByName
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
    deleteUser,
    addCategory,
    updateCategory,
    deleteCategory,
    addService,
    deleteService,
    updateService,
    addStatus,
    deleteStatus,
    updateStatus,
    newTicket
  },
  PasswordType,
  NameType
};
