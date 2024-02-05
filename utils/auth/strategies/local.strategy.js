import { Strategy } from 'passport-local';
import { AuthService } from '../../../services/auth.service.js';

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
