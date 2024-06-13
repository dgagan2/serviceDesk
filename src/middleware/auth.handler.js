import boom from '@hapi/boom';
import { config } from '../config/config.js';

/**
 * Middleware function to check the API key in the request headers.
 */
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

/**
 * This middleware works with REST API
 * Middleware function to check if the user has the necessary roles.
 * @param {...string} roles - The roles to check.
 * @returns {Function} - The middleware function.
 */
export function checkRoles (...roles) {
  return (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
      next(boom.unauthorized('You do not have the necessary permissions'));
    }
    next();
  };
}
