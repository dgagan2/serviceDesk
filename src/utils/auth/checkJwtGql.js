import boom from '@hapi/boom';

export async function checkJwtGql (context) {
  const { user } = await context.authenticate('jwt', { session: false });
  if (!user) {
    throw boom.unauthorized('Unauthorized JWT not valid');
  }
}
