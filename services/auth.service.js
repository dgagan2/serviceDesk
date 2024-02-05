import boom from '@hapi/boom';
import { UserService } from '../services/user.services.js';
import bcrypt from 'bcrypt';
const service = new UserService();

export class AuthService {
  async getUser (email, password) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw boom.unauthorized('User or password not valid');
    }
    delete user.password;
    return user;
  }
}
