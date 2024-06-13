import express from 'express'
import { createTicketState } from '../controllers/ticket-state/createTicketState.js'
import { getAllTicketState, getTicketStateById, getTicketStateByName } from '../controllers/ticket-state/getTicketState.js'
import { deleteTicketState } from '../controllers/ticket-state/deleteTicketState.js'
import { updateTicketState } from '../controllers/ticket-state/updateTicketState.js'

export const ticketStateRoute = express.Router()

ticketStateRoute.get('/', getAllTicketState)
ticketStateRoute.get('/name', getTicketStateByName)
ticketStateRoute.get('/:id', getTicketStateById)
ticketStateRoute.post('/', createTicketState)
ticketStateRoute.delete('/:id', deleteTicketState)
ticketStateRoute.patch('/:id', updateTicketState)
