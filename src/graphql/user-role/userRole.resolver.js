import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import RoleService from '../../services/userRole.services.js';
import { validateUserIsAdmin } from '../../utils/auth/userPermissions.js';

/**
 * validateUserIsAdmin() - Verifies that the user has a JWT valid and is an administrator.
 * checkJwtGql(); - Verifies that the user has a valid JWT.
 * * @param {any} context - El contexto de la consulta con los datos del usuario.
 */

// Creates a new instance of the RoleService class
const service = new RoleService();

/**
 * Adds a role.
 *
 * @param {any} _ - The placeholder for the parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.roleName - The name of the role to be added.
 */
export const addRole = async (_, { roleName }, context) => {
  await validateUserIsAdmin(context);
  return service.create(roleName);
};

/**
 * Retrieves all roles.
 */
export const allRoles = async (_, __, context) => {
  await validateUserIsAdmin(context);
  return service.find();
};

/**
 * Retrieves a role by its ID.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idRole - The ID of the role to retrieve.
 */
export const roleById = async (_, { idRole }, context) => {
  await checkJwtGql(context);
  return service.findOneById(idRole);
};

/**
 * Retrieves a role by its Name.
 *
 * @param {any} _ - The root object of the query.
 * @param {Object} args - The arguments of the query.
 * @param {string} args.roleName - The name of the role to search for.
 */
export const roleByName = async (_, { roleName }, context) => {
  await validateUserIsAdmin(context);
  return service.findByName(roleName);
};

/**
 * Updates a user's role.
 * @param {any} _ - The context object.
 * @param {Object} args - The arguments to the function.
 */
export const updateRole = async (_, args, context) => {
  await validateUserIsAdmin(context);
  return service.update(args);
};

/**
 * Deletes a role.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idRole - The ID of the role to be deleted.
 */
export const deleteRole = async (_, { idRole }, context) => {
  await validateUserIsAdmin(context);
  return service.delete(idRole);
};
