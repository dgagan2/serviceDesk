import boom from '@hapi/boom';
import StateService from '../../services/userState.services.js';
import RoleService from '../../services/userRole.services.js';

const serviceState = new StateService();
const serviceRole = new RoleService();

/**
 * Checks if a user has the necessary roles to perform an action.
 * @param {Object} user - The user object.
 * @param {...string} roles - The roles required to perform the action.
 * @throws {Error} Throws an error if the user's account is not active or if the user does not have the necessary permissions.
 */
export default async function checkRoles (user, ...roles) {
  if (!user.state || !user.role) {
    throw boom.unauthorized('Your account is not active');
  }
  const { stateName } = await serviceState.findOneById(user.state);

  if (stateName !== 'active') {
    throw boom.unauthorized('Your account is not active');
  }
  const { roleName } = await serviceRole.findOneById(user.role);

  if (!roles.includes(roleName)) {
    throw boom.unauthorized('You do not have the necessary permissions');
  }
}
