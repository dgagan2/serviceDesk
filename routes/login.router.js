import express from 'express';
import { login } from '../controllers/account/login.js';
import { validateUserInput } from '../middleware/validateUserInput.js';
export const loginRoute = express.Router();

loginRoute.post('/', validateUserInput, login);
