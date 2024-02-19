import checkRoles from '../../utils/auth/checkRolesGql.js';
import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import RoleService from '../../services/userRole.services.js';
import { validateUserIsAdmin } from '../../utils/auth/userPermissions.js';

const service = new RoleService();

export const addRole = async (_, { roleName }, context) => {
  await validateUserIsAdmin(context);
  return service.create(roleName);
};

export const allRoles = async (_, __, context) => {
  await validateUserIsAdmin(context);
  return service.find();
};

export const roleById = async (_, { idRole }, context) => {
  await checkJwtGql(context);
  return service.findOneById(idRole);
};

export const roleByName = async (_, { roleName }, context) => {
  await validateUserIsAdmin(context);
  return service.findByName(roleName);
};

export const updateRole = async (_, args, context) => {
  await validateUserIsAdmin(context);
  return service.update(args);
};

export const deleteRole = async (_, { idRole }, context) => {
  await validateUserIsAdmin(context);
  return service.delete(idRole);
};
