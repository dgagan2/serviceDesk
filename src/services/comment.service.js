import boom from '@hapi/boom';
import prisma from '../config/prismaInitialize.js';
import TicketService from './ticket.service.js';
import { UserService } from './user.services.js';

/**
 * Checks if a comment exists and validates the ticket number, user, and ticket status.
 *
 * @param {number} idComment - The ID of the comment.
 * @param {string} ticketNumber - The ticket number.
 * @param {number} idUser - The ID of the user.
 * @throws {Error} If the comment is not found, the ticket number is not valid,
 * the ticket is closed, or the user is not valid.
 */
const exitsComment = async (idComment, ticketNumber, idUser) => {
  const exitsComment = await prisma.comments.findUnique({
    where: {
      idComment
    },
    include: {
      tickets: {
        select: {
          ticketNumber: true,
          ticketStatusToTickets: {
            select: {
              statusName: true
            }
          }
        }
      },
      users: {
        select: {
          idUser: true
        }
      }
    }
  });
  if (!exitsComment) {
    throw boom.notFound('Comment not found');
  }
  if (exitsComment.ticketNumber !== ticketNumber) {
    throw boom.badRequest('Ticket number is not valid');
  }
  if (exitsComment.tickets.ticketStatusToTickets.statusName !== 'Open') {
    throw boom.badRequest('Ticket is closed');
  }
  if (exitsComment.users.idUser !== idUser) {
    throw boom.badRequest('User is not valid');
  }
};

/**
 * Service class for managing comments.
 */
class CommentService {
/**
 * Creates a new comment for a ticket.
 * @param {string} ticketNumber - The ticket number.
 * @param {string} idUser - The user ID.
 * @param {string} name - The name of the user.
 * @param {string} comment - The comment text.
 * @throws {Error} - If the ticket or user is not found.
 */
  async create ({ ticketNumber, idUser, name, comment }) {
    const ticket = await TicketService.prototype.findById(ticketNumber);
    const user = await UserService.prototype.findOneById(idUser);
    if (!ticket || !user) {
      throw boom.badRequest('Data is not valid');
    }
    const newComment = await prisma.comments.create({
      data: {
        users: {
          connect: {
            idUser
          }
        },
        comment,
        tickets: {
          connect: {
            ticketNumber
          }
        },
        name,
        creationDate: new Date()
      }
    });
    return newComment;
  }

  /**
 * Finds comments by ticket number.
 *
 * @param {string} ticketNumber - The ticket number to search for.
 */
  async findByTicket (ticketNumber) {
    const comments = await prisma.comments.findMany({
      where: {
        ticketNumber
      }
    });
    return comments;
  }

  /**
 * Updates a comment with the specified ID.
 *
 * @param {number} idComment - The ID of the comment to update.
 * @param {string} comment - The updated comment text.
 * @param {string} ticketNumber - The ticket number associated with the comment.
 * @param {number} idUser - The ID of the user performing the update.
 */
  async update ({ idComment, comment, ticketNumber }, idUser) {
    await exitsComment(idComment, ticketNumber, idUser);
    const updatedComment = await prisma.comments.update({
      where: {
        idComment
      },
      data: {
        comment
      }
    });
    return updatedComment;
  }

  /**
 * Deletes a comment.
 *
 * @param {number} idComment - The ID of the comment to delete.
 * @param {string} ticketNumber - The ticket number associated with the comment.
 * @param {number} idUser - The ID of the user performing the deletion.
 */
  async delete ({ idComment, ticketNumber }, idUser) {
    await exitsComment(idComment, ticketNumber, idUser);
    const deleteComment = await prisma.comments.delete({
      where: {
        idComment
      }
    });
    return deleteComment;
  }
}

export default CommentService;
