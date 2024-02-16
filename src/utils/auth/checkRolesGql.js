import boom from '@hapi/boom';

export default function checkRoles (user, ...roles) {
  console.log('user.state', user.role);
  if (user.state !== 'active') {
    throw boom.unauthorized('Your account is not active');
  }
  if (!roles.includes(user.role)) {
    throw boom.unauthorized('You do not have the necessary permissions');
  }
}
