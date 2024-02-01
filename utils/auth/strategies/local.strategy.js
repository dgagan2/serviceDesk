import { Strategy } from 'passport-local';
import { UserService } from '../../../services/user.services';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
const service = new UserService();

export const LocalStrategy = new Strategy(async (email, password, done) => {
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
}
);
