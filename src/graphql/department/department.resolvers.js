import DepartmentService from '../../services/department.service.js';
import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import { validateUserIsAdmin } from '../../utils/auth/userPermissions.js';
const service = new DepartmentService();

// Retrieves a department by name from the database.
export const departmetByName = async (_, { departmentName }, context) => {
  await validateUserIsAdmin(context);
  return service.findByName(departmentName);
};

// Retrieves a department by ID from the database.
export const departmentById = async (_, { idDepartment }, context) => {
  await checkJwtGql(context);
  return service.findById(idDepartment);
};

// Retrieves all departments from the database.
export const allDepartments = async (_, __, context) => {
  await validateUserIsAdmin(context);
  return service.find();
};

export const addDepartment = async (_, { dto }, context) => {
  await validateUserIsAdmin(context);
  const { departmentName } = dto;
  return service.create(departmentName);
};

export const updateDepartment = async (_, args, context) => {
  await validateUserIsAdmin(context);
  return service.update(args);
};

export const deleteDepartment = async (_, { idDepartment }, context) => {
  await validateUserIsAdmin(context);
  return service.delete(idDepartment);
};
