import prisma from '../config/prismaInitialize.js';
import boom from '@hapi/boom';
import TicketService, { getOpenStatus } from './ticket.service.js';

/**
 * Retrieves the open status of a ticket.
 */

class TicketAgentService {
  async create (data) {
    const { idStatus } = await getOpenStatus();
    await TicketService.prototype.create({ ...data, idStatus });
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
 * Busca los tickets por agente.
 * @param {number} idAgent - El ID del agente.
 */
  findByAgent (idAgent) {
    return prisma.tickets.findMany({
      where: {
        idAgent
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
export default TicketAgentService;
