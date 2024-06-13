import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import { UserService } from '../../services/user.services.js';
import boom from '@hapi/boom';
import { validateUserIsAdmin } from '../../utils/auth/userPermissions.js';

/**
 * validateUserIsAdmin() - Verifies that the user has a JWT valid and is an administrator.
 * checkJwtGql(); - Verifies that the user has a valid JWT.
 * * @param {any} context - El contexto de la consulta con los datos del usuario.
 */

// Creates a new instance of the UserService class
const service = new UserService();

/**
 * Update a user.
 * @param {any} _ - The context object.
 * @param {object} dto - The data transfer object with the user information to update.
 */
export const updateUser = async (_, { dto }, context) => {
  await validateUserIsAdmin(context);
  return service.update(dto);
};

/**
 * Deletes an user.
 *
 * @param {Object} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idUser - The ID of the user to delete.
 */
export const deleteUser = async (_, { idUser }, context) => {
  await validateUserIsAdmin(context);
  return service.delete(idUser);
};

/**
 * Retrieves an user by their email address.
 *
 * @param {Object} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.email - The email address of the user to retrieve.
 * @throws {Error} - If the user is not found.
 */
export const userByEmail = async (_, { email }, context) => {
  await validateUserIsAdmin(context);
  const user = await service.findByEmail(email);
  if (!user) {
    throw boom.notFound('User not found');
  }
  return user;
};

/**
 * Retrieves an user by their ID.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idUser - The ID of the user to retrieve.
 */
export const userById = async (_, { idUser }, context) => {
  await checkJwtGql(context);
  return service.findOneById(idUser);
};

/**
 * Retrieves an user by its name.
 *
 * @param {Object} _ - The context object of the query.
 * @param {Object} args - The arguments of the query.
 * @param {string} args.name - The name of the user to search for.
 */
export const userByName = async (_, { name }, context) => {
  await validateUserIsAdmin(context);
  return service.findByName(name);
};

/**
 * Retrieves all users.
*/
export const allUsers = async (_, __, context) => {
  await validateUserIsAdmin(context);
  return service.find();
};
