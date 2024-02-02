import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import { UserService } from '../../../services/user.services.js';
import boom from '@hapi/boom';

const service = new UserService();

const localStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await service.findByEmail(email);

    if (!user) {
      done(boom.unauthorized('User not found'), false);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return done(null, false, { message: 'User or password not valid' });
    }
    delete user.password;
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export default localStrategy;
