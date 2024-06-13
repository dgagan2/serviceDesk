import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from '../../../config/config.js';

/**
 * Options for JWT strategy.
 * @typedef {Object} JwtStrategyOptions
 * @property {Function} jwtFromRequest - Function to extract JWT from request.
 * @property {string} secretOrKey - Secret key for JWT verification.
 */

const options = {
  /**
   * Function to extract JWT from request.
   * @type {Function}
   */
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  /**
   * Secret key for JWT verification.
   * @type {string}
   */
  secretOrKey: config.jwtSecret
};

/**
 * JWT Strategy for authentication.
 *
 * @param {Object} payload - The payload extracted from the JWT token.
 * @param {Function} done - The callback function to be called when authentication is complete.
 */
const jwtStrategy = new Strategy(options, async (payload, done) => {
  return done(null, payload);
}
);

export default jwtStrategy;
