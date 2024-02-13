import boom from '@hapi/boom';

export default function checkRoles (user, ...roles) {
  if (!roles.includes(user.role)) {
    throw boom.unauthorized('You do not have the necessary permissions');
  }
}
