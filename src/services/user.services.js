import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../utils/pass-hash.js';
import prisma from '../config/prismaInitialize.js';
import boom from '@hapi/boom';

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

  find () {
    const users = prisma.users.findMany({
      include: {
        userRoles: true,
        userStates: true
      }
    });
    return users;
  }

  async findOneById (idUser) {
    const user = await prisma.users.findUnique({
      where: {
        idUser
      },
      include: {
        userRoles: true,
        userStates: true
      }
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  findByName (name) {
    const user = prisma.users.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      },
      include: {
        userRoles: true,
        userStates: true
      }
    });
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async findByEmail (email) {
    const user = await prisma.users.findUnique({
      where: {
        email
      },
      include: {
        userRoles: true,
        userStates: true
      }
    });
    return user;
  }

  async update ({ idUser, name, email, idDepartment, idRole, idState }) {
    const user = await this.findOneById(idUser);
    if (email) {
      const existEmail = await this.findByEmail(email);
      if (existEmail) {
        throw boom.badRequest('Email already exist, can`t update user');
      }
    }

    const newUser = await prisma.users.update({
      where: {
        idUser
      },
      data: {
        name: name || user.name,
        email: email || user.email,
        idDepartment: idDepartment || user.idDepartment,
        idRole: idRole || user.idRole,
        idState: idState || user.idState
      }
    });
    return newUser;
  }

  async delete (idUser) {
    await this.findOneById(idUser);
    const user = await prisma.users.delete({
      where: {
        idUser
      }
    });
    return user;
  }
}
