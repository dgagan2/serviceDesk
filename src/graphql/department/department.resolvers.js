import { departmentService } from '../../services/department.service.js';
import boom from '@hapi/boom';
import checkRoles from '../../utils/auth/checkRolesGql.js';
import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';

const service = new departmentService();

// Retrieves a department by name from the database.
export const departmetByName = async (_, { departmentName }, context) => {
  const user = await context.authenticate('jwt', { session: false });
  if (!user) {
    throw boom.unauthorized('Unauthorized');
  }
  checkRoles(user, 'customer');
  return service.findByName(departmentName);
};

// Retrieves a department by ID from the database.
export const departmentById = (_, { idDepartment }) => {
  return service.findById(idDepartment);
};

// Retrieves all departments from the database.
export const allDepartments = () => {
  return service.find();
};

export const addDepartment = async (_, { dto }, context) => {
  const user = await checkJwtGql(context);
  checkRoles(user, 'admin');
  const { departmentName } = dto;
  return service.create(departmentName);
};

export const updateDepartment = (_, args) => {
  return service.update(args);
};

export const deleteDepartment = (_, { idDepartment }) => {
  return service.delete(idDepartment);
};
