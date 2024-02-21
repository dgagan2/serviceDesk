import { GraphQLLocalStrategy } from 'graphql-passport';
import { AuthService } from '../../../services/auth.service.js';

const service = new AuthService();

/**
 * GraphQL Local Strategy for authentication.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {function} done - The callback function to be called when authentication is complete.
 */
export const GQLLocalSrategy = new GraphQLLocalStrategy(
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
