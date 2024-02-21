import prisma from '../config/prismaInitialize.js';
import boom from '@hapi/boom';

/**
 * Retrieves a random user with the role of 'agent'.
 */
const getUserByAgentRole = async () => {
  const allAgents = await prisma.users.findMany({
    where: {
      userRoles: {
        roleName: 'agent'
      }
    }
  });
  const selectAgent = allAgents[Math.floor(Math.random() * allAgents.length)];
  return selectAgent;
};

/**
 * Retrieves the open status of a ticket.
 */
const getOpenStatus = () => {
  const openStatus = prisma.ticketStatus.findFirst({
    where: {
      statusName: 'open'
    }
  });
  return openStatus;
};

class TicketService {
/**
 * Creates a new ticket.
 * @param {Object} params - The parameters for creating the ticket.
 * @param {string} params.request - The request for the ticket.
 * @param {number} params.idDepartment - The ID of the department for the ticket.
 * @param {number} params.idService - The ID of the service for the ticket.
 * @param {string} params.serviceDescription - The description of the service for the ticket.
 * @param {Object} context - The context object containing the user information.
 * @param {string} context.sub - The ID of the user creating the ticket.
 * @throws {Error} If there is an error creating the ticket.
 */
  async create ({ request, idDepartment, idService, serviceDescription }, { sub: idUser }) {
    const { idUser: idAgent } = await getUserByAgentRole();
    const { idStatus } = await getOpenStatus();

    const ticket = prisma.tickets.create({
      data: {
        request,
        idDepartment,
        idService,
        serviceDescription,
        idUser,
        idAgent,
        idStatus
      }
    });

    if (!ticket) {
      throw boom.badRequest('Error creating ticket');
    }
    return ticket;
  }

  /**
 * Find a ticket by its ticket number.
 * @param {string} ticketNumber - The ticket number to search for.
 * @returns {object} - The found ticket object.
 * @throws {Error} - If the ticket is not found.
 */
  findById (ticketNumber) {
    const ticket = prisma.tickets.findUnique({
      where: {
        ticketNumber
      }
    });
    if (!ticket) {
      throw boom.notFound('Ticket not found');
    }
    return ticket;
  }

  /**
 * Finds tickets by user ID.
 *
 * @param {number} idUser - The ID of the user.
 * @throws {Error} - If the ticket is not found.
 */
  findByUser (idUser) {
    const ticket = prisma.tickets.findMany({
      where: {
        idUser
      }
    });
    if (!ticket) {
      throw boom.notFound('Ticket not found');
    }
    return ticket;
  }

  /**
 * Busca tickets por usuario y estado.
 * @param {number} idUser - El ID del usuario.
 * @param {number} idStatus - El ID del estado.
 */
  findByUserAndStatus (idUser, idStatus) {
    return prisma.tickets.findMany({
      where: {
        idUser,
        idStatus
      }
    });
  }

  /**
 * Busca los tickets por agente.
 * @param {number} idAgent - El ID del agente.
 */
  findByAgent (idAgent) {
    return prisma.tickets.findMany({
      where: {
        idAgent
      }
    });
  }

  /**
 * Updates a ticket with the specified ticket number, agent ID, and status ID.
 * If the agent ID or status ID is not provided, it will use the existing values from the ticket.
 * @param {Object} params - The parameters for updating the ticket.
 * @param {string} params.ticketNumber - The ticket number of the ticket to be updated.
 * @param {string} params.idAgent - The ID of the agent to be assigned to the ticket (optional).
 * @param {string} params.idStatus - The ID of the status to be assigned to the ticket (optional).
 */
  async updateTicket ({ ticketNumber, idAgent, idStatus }) {
    const ticketExists = await this.findById(ticketNumber);
    const newTicket = await prisma.tickets.update({
      where: {
        ticketNumber
      },
      data: {
        idAgent: idAgent || ticketExists.idAgent,
        idStatus: idStatus || ticketExists.idStatus
      }
    });
    return newTicket;
  }

  /**
 * Deletes a ticket with the specified ticket number.
 * @param {number} ticketNumber - The ticket number of the ticket to be deleted.
 */
  delete (ticketNumber) {
    this.findById(ticketNumber);
    const ticket = prisma.tickets.delete({
      where: {
        ticketNumber
      }
    });
    return ticket;
  }
}
export default TicketService;
