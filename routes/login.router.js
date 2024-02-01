import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import config from '../config/config.js';
import passport from 'passport';

export const loginRoute = express.Router();

loginRoute.post('/', passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role
      };
      const token = jsonwebtoken.sign(payload, config.jwtSecret, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  });
