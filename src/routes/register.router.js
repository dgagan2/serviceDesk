import express from 'express';
import { validatorHandler } from '../middleware/validator.handler.js';
import { createUserSchema } from '../schemas/user.schema.js';
import { UserService } from '../services/user.services.js';

export const registerRoute = express.Router();
const service = new UserService();

registerRoute.post('/', validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      await service.create(body);
      res.status(201).json({
        message: 'user created'
      });
    } catch (err) {
      next(err);
    }
  });
