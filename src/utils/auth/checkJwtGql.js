import boom from '@hapi/boom';

export async function checkJwtGql (context) {
  const { user } = await context.authenticate('jwt', { session: false });
  console.log('user', user);
  if (!user) {
    throw boom.unauthorized('Unauthorized JWT not valid');
  }
}
