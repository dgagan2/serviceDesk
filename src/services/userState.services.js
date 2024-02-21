import prisma from '../config/prismaInitialize.js';
import boom from '@hapi/boom';

/**
 * Represents a service for managing user states.
 */
class StateService {
  /**
   * Creates a new user state.
   * @param {string} stateName - The name of the state to create.
   * @throws {Error} If the state already exists.
   */
  async create (stateName) {
    const exist = await prisma.userStates.findUnique({
      where: {
        stateName
      }
    });
    if (exist) {
      throw boom.badRequest('State already exists');
    }
    const state = await prisma.userStates.create({
      data: {
        stateName
      }
    });
    return state;
  }

  /**
   * Retrieve all user states.
   */
  async find () {
    const states = await prisma.userStates.findMany({
      include: {
        users: true
      }
    });
    return states;
  }

  /**
   * Retrieve a user state by its ID.
   *
   * @param {number} idState - The ID of the user state.
   * @throws {Error} - If the state is not found.
   */
  async findOneById (idState) {
    const state = await prisma.userStates.findUnique({
      where: {
        idState
      },
      include: {
        users: true
      }
    });
    if (!state) {
      throw boom.notFound('State not found');
    }
    return state;
  }

  /**
   * Finds a user state by its name.
   * @param {string} stateName - The name of the state to search for.
   * @throws {Error} - If the state is not found.
   */
  async findByName (stateName) {
    const state = await prisma.userStates.findUnique({
      where: {
        stateName: {
          contains: stateName,
          mode: 'insensitive'
        }
      },
      include: {
        users: true
      }
    });
    if (!state) {
      throw boom.notFound('State not found');
    }
    return state;
  }

  /**
   * Updates the user state with the specified ID.
   * @param {Object} params - The parameters for the update operation.
   * @param {number} params.idState - The ID of the user state to update.
   * @param {string} params.stateName - The new name for the user state.
   */
  async update ({ idState, stateName }) {
    await this.findOneById(idState);
    const state = await prisma.userStates.update({
      where: {
        idState
      },
      data: {
        stateName
      }
    });
    return state;
  }

  /**
   * Deletes a user state by its ID.
   * @param {number} idState - The ID of the user state to delete.
   */
  async delete (idState) {
    await this.findOneById(idState);
    const state = await prisma.userStates.delete({
      where: {
        idState
      }
    });
    return state;
  }
}

export default StateService;
