import checkRoles from '../../utils/auth/checkRolesGql.js';
import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import RoleService from '../../services/userRole.services.js';

const service = new RoleService();

export const addRole = async (_, { roleName }, context) => {
  const user = await checkJwtGql(context);
  checkRoles(user, 'admin');
  return service.create(roleName);
};

export const allRoles = async (_, __, context) => {
  const user = await checkJwtGql(context);
  checkRoles(user, 'admin');
  return service.find();
};

export const roleById = async (_, { idRole }, context) => {
  const user = await checkJwtGql(context);
  checkRoles(user, 'admin', 'customer');
  return service.findOneById(idRole);
};

export const roleByName = async (_, { roleName }, context) => {
  const user = await checkJwtGql(context);
  checkRoles(user, 'admin', 'customer');
  return service.findByName(roleName);
};

export const updateRole = async (_, args, context) => {
  const user = await checkJwtGql(context);
  checkRoles(user, 'admin');
  return service.update(args);
};

export const deleteRole = async (_, { idRole }, context) => {
  const user = await checkJwtGql(context);
  checkRoles(user, 'admin');
  return service.delete(idRole);
};
