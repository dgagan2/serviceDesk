import ServicesService from '../../services/services.services.js';
import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import { validateUserIsAdmin } from '../../utils/auth/userPermissions.js';
/**
 * validateUserIsAdmin() - Validates that the user has a JWT and is an administrator.
 * checkJwtGql(); - Verifies that the user has a valid JWT.
 * * @param {any} context - El contexto de la consulta con los datos del usuario.
 */

// Creates a new instance of the ServicesService class
const service = new ServicesService();

/**
 * Retrieves a service by its name.
 *
 * @param {any} _ - The root object of the query.
 * @param {Object} args - The arguments of the query.
 * @param {string} args.serviceName - The name of the service to search for.
 */
export const serviceByName = async (_, { serviceName }, context) => {
  await validateUserIsAdmin(context);
  return service.findByName(serviceName);
};

/**
 * Retrieves a service by its ID.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idService - The ID of the service to retrieve.
 */
export const serviceById = async (_, { idService }, context) => {
  await checkJwtGql(context);
  return service.findById(idService);
};

/**
 * Retrieves all services.
 */
export const allServices = async (_, __, context) => {
  await validateUserIsAdmin(context);
  return await service.find();
};

/**
 * Adds a service.
 *
 * @param {any} _ - The placeholder for the parent object.
 * @param {Object} args - The arguments passed to the resolver.
 */
export const addService = async (_, args, context) => {
  await validateUserIsAdmin(context);
  return service.create(args);
};

/**
 * Update a service.
 *
 * @param {any} _ - The context object.
 * @param {object} args - The arguments to the function.
 */
export const updateService = async (_, args, context) => {
  await validateUserIsAdmin(context);
  return service.update(args);
};

/**
 * Deletes a service.
 *
 * @param {Object} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idService - The ID of the service to delete.
 */
export const deleteService = async (_, { idService }, context) => {
  await validateUserIsAdmin(context);
  return service.delete(idService);
};
