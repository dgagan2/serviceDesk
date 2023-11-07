import express from 'express'
import { ticketStateRoute } from './ticketStateRoute.js'
import { createTicket, deleteTicket, getTicketByUser } from '../controllers/ticket/createTicket.js'
import { itemServiceRoute } from './itemServiceRoute.js'
import { protect } from '../middleware/auth.handler.js'

export const ticketRoute = express.Router()
ticketRoute.get('/', protect(), getTicketByUser)
ticketRoute.post('/', protect(), createTicket)
ticketRoute.delete('/:id', deleteTicket)

ticketRoute.use('/state', ticketStateRoute)
ticketRoute.use('/service', itemServiceRoute)
