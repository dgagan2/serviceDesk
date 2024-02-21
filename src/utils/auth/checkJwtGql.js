import boom from '@hapi/boom';

/**
 * Checks the validity of a JWT token in the given context.
 * @param {Object} context - The context object.
 * @returns {Object} - The user object if the JWT token is valid.
 * @throws {Error} - Throws an error if the JWT token is not valid.
 */
export async function checkJwtGql (context) {
  const { user } = await context.authenticate('jwt', { session: false });
  if (!user) {
    throw boom.unauthorized('Unauthorized JWT not valid');
  }
  return user;
}
