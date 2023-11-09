import express from 'express'
import { protect } from '../middleware/auth.handler.js'
import { getComments } from '../controllers/comments-ticket/getComments.js'
import { addComment } from '../controllers/comments-ticket/addComment.js'

export const commentsRoute = express.Router()

commentsRoute.get('/:id', protect(), getComments)
commentsRoute.post('/', protect(), addComment)
