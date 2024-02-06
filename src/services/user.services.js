import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../utils/pass-hash.js';
import prisma from '../config/prismaInitialize.js';

export class UserService {
  constructor () {

  }

  async create (data) {
    const exist = await this.findByEmail(data.email);
    if (exist) {
      const error = new Error('User already exist');
      error.status = 409;
      throw error;
    }
    const idUser = uuidv4();
    const password = await hashPassword(data.password);
    const newUser = await prisma.users.create({
      data: {
        idUser,
        name: data.name,
        email: data.email,
        password
      }
    });

    delete newUser.password;
    return newUser;
  }

  find () {}
  findOne () {}

  async findByEmail (email) {
    const exist = await prisma.users.findUnique({
      where: {
        email
      }
    });
    return exist;
  }

  update () {}
  delete () {}
}
