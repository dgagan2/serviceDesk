import express from 'express';
import { checkRoles } from '../middleware/auth.handler.js';
import passport from 'passport';

export const commentsRoute = express.Router();

commentsRoute.get('/', passport.authenticate('jwt', { session: false }), checkRoles('Admin'), (req, res) => {
  res.send('GET /comments');
});
