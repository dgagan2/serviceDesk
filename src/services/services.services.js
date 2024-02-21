import prisma from '../config/prismaInitialize.js';
import boom from '@hapi/boom';

/**
 * Represents a service for managing services.
 */
class ServicesService {
  /**
   * Creates a new service.
   * @param {Object} options - The options for creating a service.
   * @param {string} options.serviceName - The name of the service.
   * @param {string} options.servicePoster - The poster of the service.
   * @param {string} options.serviceDescription - The description of the service.
   * @param {number} options.idCategory - The ID of the category.
   * @throws {Error} If the service already exists.
   */
  async create ({ serviceName, servicePoster, serviceDescription, idCategory }) {
    const exist = await prisma.services.findUnique({
      where: {
        serviceName
      }
    });
    if (exist) {
      throw boom.badRequest('Service already exists');
    }
    const service = await prisma.services.create({
      data: {
        serviceName,
        servicePoster,
        serviceDescription,
        idCategory
      }
    });
    return service;
  }

  /**
   * Finds all services.
   */
  async find () {
    const services = await prisma.services.findMany();
    return services;
  }

  /**
   * Finds a service by its ID.
   *
   * @param {number} idService - The ID of the service to find.
   * @throws {Error} - If the service is not found.
   */
  async findById (idService) {
    const service = await prisma.services.findUnique({
      where: {
        idService
      }
    });
    if (!service) {
      throw boom.notFound('Service not found');
    }
    return service;
  }

  /**
   * Finds a service by its name.
   * @param {string} serviceName - The name of the service to find.
   * @throws {Error} - If the service is not found.
   */
  async findByName (serviceName) {
    const service = await prisma.services.findUnique({
      where: {
        serviceName: {
          contains: serviceName,
          mode: 'insensitive'
        }
      }
    });
    if (!service) {
      throw boom.notFound('Service not found');
    }
    return service;
  }

  /**
   * Updates a service.
   * @param {Object} params - The parameters for the update operation.
   * @param {number} params.idService - The ID of the service to update.
   * @param {string} [params.serviceName] - The new name for the service.
   * @param {string} [params.servicePoster] - The new poster for the service.
   * @param {string} [params.serviceDescription] - The new description for the service.
   * @param {number} [params.idCategory] - The new category ID for the service.
   */
  async update ({ idService, serviceName, servicePoster, serviceDescription, idCategory }) {
    const service = await this.findById(idService);
    const newService = await prisma.services.update({
      where: {
        idService
      },
      data: {
        serviceName: serviceName || service.serviceName,
        servicePoster: servicePoster || service.servicePoster,
        serviceDescription: serviceDescription || service.serviceDescription,
        idCategory: idCategory || service.idCategory
      }
    });
    return newService;
  }

  /**
   * Deletes a service by its ID.
   * @param {number} idService - The ID of the service to delete.
   */
  async delete (idService) {
    await this.findById(idService);
    const service = await prisma.services.delete({
      where: {
        idService
      }
    });
    return service;
  }
}

export default ServicesService;
