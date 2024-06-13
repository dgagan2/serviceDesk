import { AuthService } from '../../services/auth.service.js';

const service = new AuthService();

export const login = async (_, { email, password }, context) => {
  const { user } = await context.authenticate('graphql-local', { email, password });
  const token = service.signToken(user);
  return { token, user };
};
