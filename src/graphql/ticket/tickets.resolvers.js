import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import TicketService from '../../services/ticket.service.js';
const service = new TicketService();

export const newTicket = async (_, { dto }, context) => {
  const user = await checkJwtGql(context);

  return service.create(dto, user);
};
