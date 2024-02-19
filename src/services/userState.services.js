import prisma from '../config/prismaInitialize.js';
import boom from '@hapi/boom';

class StateService {
  constructor () {

  }

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

  async find () {
    const states = await prisma.userStates.findMany({
      include: {
        users: true
      }
    });
    return states;
  }

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
