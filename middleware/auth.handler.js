import boom from '@hapi/boom';
import { config } from '../config/config.js';

function checkApiKey (req, res, next) {
  const apikey = req.headers['api-key'];
  if (!apikey) {
    next(boom.unauthorized('apiKey is required'));
  }
  if (apikey !== config.apiKey) {
    next(boom.unauthorized('apiKey is invalid'));
  }
  next();
}

export default checkApiKey;
