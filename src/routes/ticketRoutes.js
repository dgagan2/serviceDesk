import express from 'express'
import { ticketStateRoute } from './ticketStateRoute.js'
import { createTicket } from '../controllers/ticket/createTicket.js'
import { itemServiceRoute } from './itemServiceRoute.js'
import { protect } from '../middleware/auth.handler.js'
import { getTicketByUser } from '../controllers/ticket/getTickets.js'
import { deleteTicket } from '../controllers/ticket/deleteTicket.js'
import { closeTicket } from '../controllers/ticket/updateTicket.js'

export const ticketRoute = express.Router()
ticketRoute.get('/', protect(), getTicketByUser)
ticketRoute.post('/', protect(), createTicket)
ticketRoute.delete('/:id', protect(), deleteTicket)
ticketRoute.patch('/close', protect(), closeTicket)
ticketRoute.use('/state', ticketStateRoute)
ticketRoute.use('/service', itemServiceRoute)
