import boom from '@hapi/boom';
import StateService from '../../services/userState.services.js';
import RoleService from '../../services/userRole.services.js';

const serviceState = new StateService();
const serviceRole = new RoleService();

export default async function checkRoles (user, ...roles) {
  const { stateName } = await serviceState.findOneById(user.state);

  if (stateName !== 'active') {
    throw boom.unauthorized('Your account is not active');
  }
  const { roleName } = await serviceRole.findOneById(user.role);

  if (!roles.includes(roleName)) {
    throw boom.unauthorized('You do not have the necessary permissions');
  }
}
