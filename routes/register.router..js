import express from 'express';
import { register } from '../controllers/account/register.js';
import { validateUserInputRegister } from '../middleware/validateUserInput.js';

export const registerRoute = express.Router();

registerRoute.post('/', validateUserInputRegister, register);
