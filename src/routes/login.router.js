import express from 'express';
import passport from 'passport';
import { AuthService } from '../services/auth.service.js';

export const loginRoute = express.Router();
// El login esta implementado usando graphql, por lo que no se necesita esta ruta
// se toma esta ruta como ejemplo para mostrar como se implementa el login con express
const service = new AuthService();

loginRoute.post('/', passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const token = service.signToken(user);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  });
