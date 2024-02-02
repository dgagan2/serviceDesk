import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import passport from 'passport';
import { config } from '../config/config.js';

export const loginRoute = express.Router();

loginRoute.post('/', passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;

      const payload = {
        sub: user.idUser,
        role: user.idRole,
        email: user.email
      };
      const token = jsonwebtoken.sign(payload, config.jwtSecret, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  });
