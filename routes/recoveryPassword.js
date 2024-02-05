import express from 'express';
import { validatorHandler } from '../middleware/validator.handler.js';
import { recoveryPasswordSchema } from '../schemas/user.schema.js';
import { AuthService } from '../services/auth.service.js';

const service = new AuthService();
export const recovery = express.Router();

recovery.post('/', validatorHandler(recoveryPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendMailResetPassword(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  });
