import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import { Strategy } from 'passport-jwt';
import { UserService } from '../../../services/user.services.js';

const service = new UserService();

const LocalStrategy = new Strategy(async (email, password, done) => {
  try {
    const user = await service.findByEmail(email);
    if (!user) {
      done(boom.unauthorized('User not found'));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      done(boom.unauthorized('User or password not valid'));
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export default LocalStrategy;
