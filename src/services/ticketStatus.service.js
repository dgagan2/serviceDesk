import prisma from '../config/prismaInitialize.js';
import boom from '@hapi/boom';

/**
 * Service class for managing ticket status.
 */
class TicketStatusService {
  /**
   * Creates a new ticket status.
   * @param {string} statusName - The name of the status.
   * @throws {Error} If the status already exists.
   */
  async create (statusName) {
    const exist = await prisma.ticketStatus.findUnique({
      where: {
        statusName
      }
    });
    if (exist) {
      throw boom.badRequest('Status already exists');
    }
    const status = await prisma.ticketStatus.create({
      data: {
        statusName
      }
    });
    return status;
  }

  /**
   * Retrieves all ticket statuses.
   */
  async find () {
    return await prisma.ticketStatus.findMany();
  }

  /**
   * Find a ticket status by its ID.
   * @param {number} idStatus - The ID of the ticket status.
   * @throws {Error} If the ticket status is not found.
   */
  async findOneById (idStatus) {
    const status = await prisma.ticketStatus.findUnique({
      where: {
        idStatus
      }
    });
    if (!status) {
      throw boom.notFound('Status not found');
    }
    return status;
  }

  /**
   * Finds a ticket status by its name.
   * @param {string} statusName - The name of the status to search for.
   * @throws {Error} - If the status is not found.
   */
  async findByName (statusName) {
    const status = await prisma.ticketStatus.findUnique({
      where: {
        statusName: {
          contains: statusName,
          mode: 'insensitive'
        }
      }
    });
    if (!status) {
      throw boom.notFound('Status not found');
    }
    return status;
  }

  /**
   * Updates the ticket status with the specified ID.
   * @param {Object} options - The options for updating the ticket status.
   * @param {number} options.idStatus - The ID of the ticket status to update.
   * @param {string} options.statusName - The new name for the ticket status.
   */
  async update ({ idStatus, statusName }) {
    await this.findOneById(idStatus);
    const status = await prisma.ticketStatus.update({
      where: {
        idStatus
      },
      data: {
        statusName
      }
    });
    return status;
  }

  /**
   * Deletes a ticket status by its ID.
   * @param {number} idStatus - The ID of the ticket status to delete.
   */
  async delete (idStatus) {
    await this.findOneById(idStatus);
    const status = await prisma.ticketStatus.delete({
      where: {
        idStatus
      }
    });
    return status;
  }
}

export default TicketStatusService;
