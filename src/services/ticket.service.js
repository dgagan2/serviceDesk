import prisma from '../config/prismaInitialize.js';
import boom from '@hapi/boom';

/**
 * Retrieves a random user with the role of 'agent'.
 */
export const getUserByAgentRole = async (idService) => {
  const { idDepartment } = await prisma.services.findUnique({
    where: {
      idService
    }
  });
  if (!idDepartment) throw boom.notFound('No hay agentes disponibles para este servicio.');
  const allAgents = await prisma.users.findMany({
    where: {
      userRoles: {
        roleName: 'agent'
      },
      department: {
        idDepartment
      }
    }
  });
  const selectAgent = allAgents[Math.floor(Math.random() * allAgents.length)];
  return selectAgent;
};

/**
 * Retrieves the open status of a ticket.
 */
export const getOpenStatus = () => {
  const openStatus = prisma.ticketStatus.findFirst({
    where: {
      statusName: 'Open'
    }
  });
  if (!openStatus) throw boom.notFound('Open sratus not found');
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
  async create ({ request, idDepartment, idService, serviceDescription, idUser, ticketStatus, idAgent }) {
    const ticket = prisma.tickets.create({
      data: {
        request,
        idDepartment,
        idService,
        serviceDescription,
        idUser,
        idAgent,
        ticketStatus,
        creationDate: new Date(),
        updateDate: new Date()
      }
    });

    if (!ticket) {
      throw boom.badRequest('Error creating ticket');
    }
    return ticket;
  }

  async findAll (pageNumber, pageSize) {
    const count = await prisma.tickets.count();
    const tickets = await prisma.tickets.findMany({
      include: {
        department: true,
        services: true,
        users_tickets_idAgentTousers: true,
        users_tickets_idUserTousers: true,
        comments: true,
        ticketStatusToTickets: true
      },
      take: pageSize,
      skip: (pageNumber - 1) * pageSize
    });
    if (!tickets) {
      throw boom.notFound('Ticket not found');
    }
    return { tickets, count };
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
      },
      include: {
        department: true,
        services: true,
        users_tickets_idAgentTousers: true,
        users_tickets_idUserTousers: true,
        comments: true,
        ticketStatusToTickets: true
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
      },
      include: {
        department: true,
        services: true,
        users_tickets_idAgentTousers: true,
        users_tickets_idUserTousers: true,
        comments: true,
        ticketStatusToTickets: true
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
      },
      include: {
        department: true,
        services: true,
        users_tickets_idAgentTousers: true,
        users_tickets_idUserTousers: true,
        comments: true,
        ticketStatusToTickets: true
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
  async closeTicket (ticketNumber) {
    await this.findById(ticketNumber);
    const { idStatus } = await prisma.ticketStatus.findMany({
      where: {
        statusName: 'Close'
      }
    });
    const newTicket = await prisma.tickets.update({
      where: {
        ticketNumber
      },
      data: {
        idStatus
      }
    });
    return newTicket;
  }
}
export default TicketService;
