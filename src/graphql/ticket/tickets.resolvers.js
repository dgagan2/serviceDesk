import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import TicketService, { getOpenStatus, getUserByAgentRole } from '../../services/ticket.service.js';
import { validateUserIsAgent } from '../../utils/auth/userPermissions.js';

/**
 * validateUserIsAdmin() - Validates that the user has a JWT and is an administrator.
 * validateUserIsAgent() - Validates that the user has a JWT and is an administrator or agent.
 * checkJwtGql(); - Verifies that the user has a valid JWT.
 * * @param {any} context - El contexto de la consulta con los datos del usuario.
 */

// Creates a new instance of the TicketService class
const service = new TicketService();

/**
 * Creates a new ticket.
 *
 * @param {any} _ - The placeholder for the parent object.
 * @param {object} dto - The data transfer object containing the ticket information.
 */
export const newTicket = async (_, { dto }, context) => {
  const { sub: idUser } = await checkJwtGql(context);
  const { idUser: idAgent } = await getUserByAgentRole(dto.idService);
  const { idStatus: ticketStatus } = await getOpenStatus();
  return service.create({ ...dto, idUser, ticketStatus, idAgent });
};

/**
 * Retrieves a ticket by its ID.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.ticketNumber - The ticket number to search for.
 */
export const ticketByID = async (_, { ticketNumber }, context) => {
  await checkJwtGql(context);
  return service.findById(ticketNumber);
};

/**
 * Retrieves tickets by user.
 */
export const ticketByUser = async (_, __, context) => {
  const user = await checkJwtGql(context);
  return service.findByUser(user.sub);
};

/**
 * Retrieves tickets by status.
 *
 * @param {any} _ - The placeholder for the parent object.
 * @param {string} idStatus - The ID of the status to filter tickets by.
 */
export const ticketByStatus = async (_, { idStatus }, context) => {
  const user = await checkJwtGql(context);
  return service.findByUser(user.sub, idStatus);
};

/**
 * Updates a ticket.
 *
 * @param {any} _ - The placeholder for the parent object.
 * @param {object} dto - The data transfer object containing the updated ticket information.
 * @param {object} context - The context object containing the user information.
 */
export const closetTicket = async (_, { ticketNumber }, context) => {
  await validateUserIsAgent(context);
  return service.closeTicket(ticketNumber);
};
