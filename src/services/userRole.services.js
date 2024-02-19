import prisma from '../config/prismaInitialize.js';
import boom from '@hapi/boom';

class RoleService {
  constructor () {

  }

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

  async find () {
    const roles = await prisma.userRoles.findMany({
      include: {
        users: true
      }
    });
    return roles;
  }

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
