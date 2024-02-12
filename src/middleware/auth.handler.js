import boom from '@hapi/boom';
import { config } from '../config/config.js';

export function checkApiKey (req, res, next) {
  const apikey = req.headers['api-key'];
  if (!apikey) {
    next(boom.unauthorized('apiKey is required'));
  }
  if (apikey !== config.apiKey) {
    next(boom.unauthorized('apiKey is invalid'));
  }
  next();
}

export function checkRoles (...roles) {
  return (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
      next(boom.unauthorized('You do not have the necessary permissions'));
    }
    next();
  };
}
