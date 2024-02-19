import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import { UserService } from '../../services/user.services.js';
import boom from '@hapi/boom';
import { validateUserIsAdmin } from '../../utils/auth/userPermissions.js';

const service = new UserService();

export const updateUser = async (_, { dto }, context) => {
  await validateUserIsAdmin(context);
  return service.update(dto);
};

export const deleteUser = async (_, { idUser }, context) => {
  await validateUserIsAdmin(context);
  return service.delete(idUser);
};

export const userByEmail = async (_, { email }, context) => {
  await validateUserIsAdmin(context);
  const user = await service.findByEmail(email);
  if (!user) {
    throw boom.notFound('User not found');
  }
  return user;
};

export const userById = async (_, { idUser }, context) => {
  await checkJwtGql(context);
  return service.findOneById(idUser);
};

export const userByName = async (_, { name }, context) => {
  await validateUserIsAdmin(context);
  return service.findByName(name);
};

export const allUsers = async (_, __, context) => {
  await validateUserIsAdmin(context);
  return service.find();
};
