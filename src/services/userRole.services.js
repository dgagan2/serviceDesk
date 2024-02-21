import prisma from '../config/prismaInitialize.js';
import boom from '@hapi/boom';

/**
 * Represents a service for managing user roles.
 */
class RoleService {
  /**
   * Creates a new user role.
   * @param {string} roleName - The name of the role to be created.
   * @throws {Error} - If the role already exists.
   */
  async create (roleName) {
    const exist = await prisma.userRoles.findUnique({
      where: {
        roleName
      }
    });
    if (exist) {
      throw boom.badRequest('Role already exists');
    }
    const role = await prisma.userRoles.create({
      data: {
        roleName
      }
    });
    return role;
  }

  /**
   * Finds user roles.
   */
  async find () {
    const roles = await prisma.userRoles.findMany({
      include: {
        users: true
      }
    });
    return roles;
  }

  /**
   * Find a user role by its ID.
   *
   * @param {number} idRole - The ID of the role to find.
   * @throws {Error} - If the role is not found.
   */
  async findOneById (idRole) {
    const role = await prisma.userRoles.findUnique({
      where: {
        idRole
      },
      include: {
        users: true
      }
    });
    if (!role) {
      throw boom.notFound('Role not found');
    }
    return role;
  }

  /**
   * Finds a user role by name.
   * @param {string} roleName - The name of the role to search for.
   * @throws {Error} - Throws an error if the role is not found.
   */
  async findByName (roleName) {
    const role = await prisma.userRoles.findUnique({
      where: {
        roleName: {
          contains: roleName,
          mode: 'insensitive'
        }
      },
      include: {
        users: true
      }
    });
    if (!role) {
      throw boom.notFound('Role not found');
    }
    return role;
  }

  /**
   * Updates a user role by its ID.
   * @param {Object} params - The parameters for the update operation.
   * @param {number} params.idRole - The ID of the role to update.
   * @param {string} params.roleName - The new name for the role.
   */
  async update ({ idRole, roleName }) {
    await this.findOneById(idRole);
    const role = await prisma.userRoles.update({
      where: {
        idRole
      },
      data: {
        roleName
      }
    });
    return role;
  }

  /**
   * Deletes a user role by its ID.
   * @param {number} idRole - The ID of the role to delete.
   */
  async delete (idRole) {
    await this.findOneById(idRole);
    const role = await prisma.userRoles.delete({
      where: {
        idRole
      }
    });
    return role;
  }
}

export default RoleService;
