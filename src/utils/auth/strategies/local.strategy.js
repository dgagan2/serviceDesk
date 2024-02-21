import { Strategy } from 'passport-local';
import { AuthService } from '../../../services/auth.service.js';

/**
 * Local authentication strategy.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {function} done - The callback function to be called when authentication is complete.
 */
const localStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await AuthService.getUser(email, password);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export default localStrategy;
