import express from 'express';
import { validatorHandler } from '../middleware/validator.handler.js';
import { changePasswordSchema, recoveryPasswordSchema } from '../schemas/user.schema.js';
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
  }
);

recovery.post('/change-password', validatorHandler(changePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { password, token } = req.body;
      const rta = await service.changePassword(password, token);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);
