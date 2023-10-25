import express from 'express'
import { ticketStateRoute } from './ticketStateRoute.js'
import { createTicket } from '../controllers/ticket/createTicket.js'
import { itemServiceRoute } from './itemServiceRoute.js'

export const ticketRoute = express.Router()

ticketRoute.get('/', createTicket)

ticketRoute.use('/state', ticketStateRoute)
ticketRoute.use('/service', itemServiceRoute)
