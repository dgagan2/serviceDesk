import boom from '@hapi/boom';
import prisma from '../config/prismaInitialize.js';

export class departmentService {
  constructor () {
    this.department = [];
  }

  create (departmentName) {
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

  update () {}
  delete () {}
}
