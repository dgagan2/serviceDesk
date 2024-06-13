import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import CommentService from '../../services/comment.service.js';

/**
 * Represents an instance of the CommentService class.
 * @type {CommentService}
 */
const service = new CommentService();

/**
 * Adds a comment.
 *
 * @param {object} args - The arguments for adding a comment.
 * @param {object} context - The context object containing additional information.
 */
export const addComment = async (_, args, context) => {
  await checkJwtGql(context);
  return service.create(args);
};

/**
 * Retrieves comments by ticket number.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.ticketNumber - The ticket number to retrieve comments for.
 * @param {Object} context - The context object containing additional data and functions.
 */
export const commentsByTicket = async (_, { ticketNumber }, context) => {
  await checkJwtGql(context);
  return service.findByTicket(ticketNumber);
};

/**
 * Edits a comment.
 *
 * @param {any} _ - The parent object.
 * @param {object} args - The arguments passed to the resolver.
 * @param {object} context - The context object containing information about the current request.
 */
export const editComment = async (_, args, context) => {
  const { sub } = await checkJwtGql(context);
  return service.update(args, sub);
};

/**
 * Deletes a comment.
 *
 * @param {any} _ - The parent object.
 * @param {object} args - The arguments passed to the resolver.
 * @param {object} context - The context object containing information about the current request.
 */
export const deleteComment = async (_, args, context) => {
  const { sub } = await checkJwtGql(context);
  return service.delete(args, sub);
};
