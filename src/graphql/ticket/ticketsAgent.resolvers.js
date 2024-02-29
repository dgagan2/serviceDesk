import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import { validateUserIsAdmin, validateUserIsAgent } from '../../utils/auth/userPermissions.js';
import TicketAgentService from '../../services/ticketAgent.service.js';

/**
 * validateUserIsAdmin() - Validates that the user has a JWT and is an administrator.
 * validateUserIsAgent() - Validates that the user has a JWT and is an administrator or agent.
 * checkJwtGql(); - Verifies that the user has a valid JWT.
 * * @param {any} context - El contexto de la consulta con los datos del usuario.
 */

// Creates a new instance of the TicketService class
const service = new TicketAgentService();

/**
 * Creates a new ticket.
 *
 * @param {any} _ - The placeholder for the parent object.
 * @param {object} dto - The data transfer object containing the ticket information.
 */
export const newTicket = async (_, { dto }, context) => {
  await validateUserIsAgent(context);
  return service.create(dto);
};

export const allTickets = async (_, { pageNumber = 1, pageSize = 10 }, context) => {
  await validateUserIsAdmin(context);
  return service.findAll(pageNumber, pageSize);
};

/**
 * Retrieves tickets by status.
 *
 * @param {any} _ - The placeholder for the parent object.
 * @param {string} idStatus - The ID of the status to filter tickets by.
 */
export const ticketByStatusAndUser = async (_, {idUser, idStatus }, context) => {
  const user = await checkJwtGql(context);
  return service.(idUser, idStatus);
};

/**
 * Retrieves tickets assigned to the agent.
 *
 * @param {any} _ - The placeholder for the parent object.
 */
export const ticketByAgent = async (_, { idAgent }, context) => {
  const user = await validateUserIsAgent(context);
  return service.findByAgent(idAgent || user.sub);
};

/**
 * Updates a ticket.
 *
 * @param {any} _ - The placeholder for the parent object.
 * @param {object} dto - The data transfer object containing the updated ticket information.
 * @param {object} context - The context object containing the user information.
 */
export const updateTicket = async (_, { dto }, context) => {
  await validateUserIsAgent(context);
  return service.updateTicket(dto);
};

