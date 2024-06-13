import TicketStatusService from '../../services/ticketStatus.service.js';
import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import { validateUserIsAdmin } from '../../utils/auth/userPermissions.js';

/**
 * validateUserIsAdmin() - Validates that the user has a JWT and is an administrator.
 * checkJwtGql(); - Verifies that the user has a valid JWT.
 * * @param {any} context - El contexto de la consulta con los datos del usuario.
 */

// Creates a new instance of the TicketStatusService class
const service = new TicketStatusService();

/**
 * Adds a new status.
 *
 * @param {Object} _ - The parent object.
 * @param {Object} args - The arguments object.
 * @param {string} args.statusName - The name of the status to be added.
 */
export const addStatus = async (_, { statusName }, context) => {
  await validateUserIsAdmin(context);
  return service.create(statusName);
};

/**
 * Retrieves all ticket statuses.
 */
export const allStatus = async (_, __, context) => {
  await validateUserIsAdmin(context);
  return service.find();
};

/**
 * Retrieves the ticket status by its ID.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idStatus - The ID of the ticket status to retrieve.
 */
export const statusById = async (_, { idStatus }, context) => {
  await checkJwtGql(context);
  return service.findOneById(idStatus);
};

/**
 * Retrieves a ticket status by its name.
 *
 * @param {any} _ - The context object.
 * @param {Object} args - The arguments to the function.
 * @param {string} args.statusName - The name of the ticket status to search for.
 */
export const statusByName = async (_, { statusName }, context) => {
  await validateUserIsAdmin(context);
  return service.findByName(statusName);
};

/**
 * Update the status of a ticket.
 * @param {any} _ - The context object.
 * @param {any} args - The function arguments.
 */
export const updateStatus = async (_, args, context) => {
  await validateUserIsAdmin(context);
  return service.update(args);
};

/**
 * Deletes a status by its ID.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idStatus - The ID of the status to delete.
 */
export const deleteStatus = async (_, { idStatus }, context) => {
  await validateUserIsAdmin(context);
  return service.delete(idStatus);
};
