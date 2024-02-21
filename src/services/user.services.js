import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../utils/pass-hash.js';
import prisma from '../config/prismaInitialize.js';
import boom from '@hapi/boom';

/**
 * Service class for managing user operations.
 */
export class UserService {
  /**
   * Creates a new user.
   * @param {Object} data - The user data.
   * @param {string} data.name - The name of the user.
   * @param {string} data.email - The email of the user.
   * @param {string} data.password - The password of the user.
   * @throws {Error} If the user already exists.
   */
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

  /**
   * Retrieves all users.
   * @returns {Promise<Array<Object>>} The list of users.
   */
  find () {
    const users = prisma.users.findMany({
      include: {
        userRoles: true,
        userStates: true
      }
    });
    return users;
  }

  /**
   * Retrieves a user by ID.
   * @param {string} idUser - The ID of the user.
   * @throws {Error} If the user is not found.
   */
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

  /**
   * Retrieves users by name.
   * @param {string} name - The name to search for.
   * @throws {Error} If no users are found.
   */
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

  /**
   * Retrieves a user by email.
   * @param {string} email - The email of the user.
   */
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

  /**
   * Updates a user.
   * @param {Object} params - The update parameters.
   * @param {string} params.idUser - The ID of the user to update.
   * @param {string} [params.name] - The new name of the user.
   * @param {string} [params.email] - The new email of the user.
   * @param {string} [params.idDepartment] - The new department ID of the user.
   * @param {string} [params.idRole] - The new role ID of the user.
   * @param {string} [params.idState] - The new state ID of the user.
   * @throws {Error} If the email already exists.
   */
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

  /**
   * Deletes a user.
   * @param {string} idUser - The ID of the user to delete.
   * @throws {Error} If the user is not found.
   */
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
