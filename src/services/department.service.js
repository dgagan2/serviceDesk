import boom from '@hapi/boom';
import prisma from '../config/prismaInitialize.js';

export class departmentService {
  constructor () {
    this.department = [];
  }

  create (departmentName) {
    const existingDepartment = prisma.department.findUnique({
      where: {
        departmentName
      }
    });
    if (existingDepartment) {
      throw boom.badRequest('Department already exists');
    }
    const department = prisma.department.create({
      data: {
        departmentName
      }
    });
    return department;
  }

  find () {
    const departments = prisma.department.findMany();
    return departments;
  }

  async findByName (departmentName) {
    const department = await prisma.department.findMany({
      where: {
        departmentName: {
          contains: departmentName,
          mode: 'insensitive'
        }
      }
    });
    if (!department) {
      throw boom.notFound('Department not found');
    }
    return department;
  }

  async findById (idDepartment) {
    const department = await prisma.department.findUnique({
      where: {
        idDepartment
      }
    });
    if (!department) {
      throw boom.notFound('Department not found');
    }
    return department;
  }

  update ({ idDepartment, departmentName }) {
    const department = prisma.department.update({
      where: {
        idDepartment
      },
      data: {
        departmentName
      }
    });
    return department;
  }

  delete (idDepartment) {
    const department = prisma.department.delete({
      where: {
        idDepartment
      }
    });
    return department;
  }
}
