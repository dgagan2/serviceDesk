import DepartmentService from '../../services/department.service.js';
import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import { validateUserIsAdmin } from '../../utils/auth/userPermissions.js';

// Creates a new instance of the DepartmentService class
const service = new DepartmentService();

/**
 * validateUserIsAdmin() - Validates that the user has a JWT and is an administrator.
 * checkJwtGql(); - Verifies that the user has a valid JWT.
 * * @param {any} context - El contexto de la consulta con los datos del usuario.
 */

/**
 * Retrieves a department by name from the database.
 * @param {any} _ - El objeto raíz de la consulta.
 * @param {string} departmentName - El nombre del departamento a buscar.
 */
export const departmetByName = async (_, { departmentName }, context) => {
  await validateUserIsAdmin(context);
  return service.findByName(departmentName);
};

/**
 * Retrieves a department by ID from the database.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idDepartment - The ID of the department.
 */
export const departmentById = async (_, { idDepartment }, context) => {
  await checkJwtGql(context);
  return service.findById(idDepartment);
};

/**
 * Retrieves all departments.
 *
 * @param {any} _ - The root value.
 * @param {any} __ - The arguments.
 */
export const allDepartments = async (_, __, context) => {
  await validateUserIsAdmin(context);
  return service.find();
};

/**
 * Adds a new department.
 *
 * @param {any} _ - The parent object.
 * @param {Object} dto - The department data transfer object.
 */
export const addDepartment = async (_, { dto }, context) => {
  await validateUserIsAdmin(context);
  const { departmentName } = dto;
  return service.create(departmentName);
};

/**
 * Actualiza un departamento.
 * @param {any} _ - El objeto de contexto.
 * @param {any} args - Los argumentos de la función.
 */
export const updateDepartment = async (_, args, context) => {
  await validateUserIsAdmin(context);
  return service.update(args);
};

/**
 * Deletes a department.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idDepartment - The ID of the department to delete.
 */
export const deleteDepartment = async (_, { idDepartment }, context) => {
  await validateUserIsAdmin(context);
  return service.delete(idDepartment);
};
