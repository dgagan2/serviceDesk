import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import StateService from '../../services/userState.services.js';
import { validateUserIsAdmin } from '../../utils/auth/userPermissions.js';
/**
 * validateUserIsAdmin() - Verifies that the user has a JWT valid and is an administrator.
 * checkJwtGql(); - Verifies that the user has a valid JWT.
 * * @param {any} context - El contexto de la consulta con los datos del usuario.
 */

// Creates a new instance of the StateService class
const service = new StateService();

/**
 * Adds a new state.
 *
 * @param {any} _ - The placeholder for the parent object.
 * @param {Object} args - The arguments for adding a new state.
 * @param {string} args.stateName - The name of the state to be added.
 */
export const addState = async (_, { stateName }, context) => {
  await validateUserIsAdmin(context);
  return service.create(stateName);
};

/**
 * Retrieves all user states.
 */
export const allStates = async (_, __, context) => {
  await validateUserIsAdmin(context);
  return service.find();
};

/**
 * Retrieves the status by their ID.
 *
 * @param {any} _ - The root object of the query.
 * @param {Object} args - The arguments of the query.
 * @param {string} args.idState - The ID of the state to search for.
 */
export const stateById = async (_, { idState }, context) => {
  await checkJwtGql(context);
  return service.findOneById(idState);
};

/**
 * Retrieves the state by name.
 *
 * @param {any} _ - The context object.
 * @param {string} stateName - The name of the state to search for.
 * @param {any} context - The application context.
 * @returns {Promise<any>} - A promise that resolves to the found state.
 */
export const stateByName = async (_, { stateName }, context) => {
  await validateUserIsAdmin(context);
  return service.findByName(stateName);
};

/**
 * Update user status.
 * @param {any} _ - The context object.
 * @param {any} args - The function arguments.
 */
export const updateState = async (_, args, context) => {
  await validateUserIsAdmin(context);
  return service.update(args);
};

/**
 * Deletes a user state.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idState - The ID of the state to delete.
 */
export const deleteState = async (_, { idState }, context) => {
  await validateUserIsAdmin(context);
  return service.delete(idState);
};
