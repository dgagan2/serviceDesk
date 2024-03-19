import { loginRoute } from './login.router.js';
import { registerRoute } from './register.router.js';
import { uploadImageRoute } from './uploadImage.router.js';
import express from 'express';
import { checkApiKey } from '../middleware/auth.handler.js';
import { recovery } from './recoveryPassword.js';
import passport from 'passport';

export function checkJWT () {
  return passport.authenticate('jwt', { session: false });
}

export const routerApi = (app) => {
  const router = express.Router();
  app.use('/api', checkApiKey, router);
  router.use('/login', checkApiKey, loginRoute);
  router.use('/register', checkApiKey, registerRoute);
  router.use('/recovery', checkApiKey, checkJWT(), recovery);
  router.use('/upload/image', checkApiKey, checkJWT(), uploadImageRoute);
};
