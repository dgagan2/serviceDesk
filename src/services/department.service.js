import boom from '@hapi/boom';
import prisma from '../config/prismaInitialize.js';

/**
 * Service class for managing departments.
 */
class DepartmentService {
  /**
   * Creates a new department.
   * @param {string} departmentName - The name of the department.
   * @throws {Error} - If the department already exists.
   */
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

  /**
   * Retrieves all departments with their associated users.
   */
  find () {
    const departments = prisma.department.findMany({
      include: {
        users: true
      }
    });
    return departments;
  }

  /**
   * Finds a department by its name.
   * @param {string} departmentName - The name of the department to search for.
   * @throws {Error} - Throws an error if the department is not found.
   */
  async findByName (departmentName) {
    const department = await prisma.department.findMany({
      where: {
        departmentName: {
          contains: departmentName,
          mode: 'insensitive'
        }
      },
      include: {
        users: true
      }
    });
    if (!department) {
      throw boom.notFound('Department not found');
    }
    return department;
  }

  /**
   * Find a department by its ID.
   * @param {number} idDepartment - The ID of the department to find.
   * @throws {Error} - If the department is not found.
   */
  async findById (idDepartment) {
    const department = await prisma.department.findUnique({
      where: {
        idDepartment
      },
      include: {
        users: true
      }
    });
    if (!department) {
      throw boom.notFound('Department not found');
    }
    return department;
  }

  /**
   * Updates a department with the specified ID.
   * @param {Object} params - The parameters for the update operation.
   * @param {number} params.idDepartment - The ID of the department to update.
   * @param {string} params.departmentName - The new name for the department.
   */
  async update ({ idDepartment, departmentName }) {
    await this.findById(idDepartment);
    const department = await prisma.department.update({
      where: {
        idDepartment
      },
      data: {
        departmentName
      }
    });
    return department;
  }

  /**
   * Deletes a department by its ID.
   * @param {number} idDepartment - The ID of the department to delete.
   */
  async delete (idDepartment) {
    await this.findById(idDepartment);
    const department = prisma.department.delete({
      where: {
        idDepartment
      }
    });
    return department;
  }
}

export default DepartmentService;
