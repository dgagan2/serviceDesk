import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import StateService from '../../services/userState.services.js';
import { validateUserIsAdmin } from '../../utils/auth/userPermissions.js';

const service = new StateService();

export const addState = async (_, { stateName }, context) => {
  await validateUserIsAdmin(context);
  return service.create(stateName);
};

export const allStates = async (_, __, context) => {
  await validateUserIsAdmin(context);
  return service.find();
};

export const stateById = async (_, { idState }, context) => {
  await checkJwtGql(context);
  return service.findOneById(idState);
};

export const stateByName = async (_, { stateName }, context) => {
  await validateUserIsAdmin(context);
  return service.findByName(stateName);
};

export const updateState = async (_, args, context) => {
  await validateUserIsAdmin(context);
  return service.update(args);
};

export const deleteState = async (_, { idState }, context) => {
  await validateUserIsAdmin(context);
  return service.delete(idState);
};
