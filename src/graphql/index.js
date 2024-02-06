import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { expressMiddleware } from '@apollo/server/express4';
import { loadFiles } from '@graphql-tools/load-files';
import { resolvers } from './resolver.js';

const useGraphql = async (app) => {
  const server = new ApolloServer({
    typeDefs: await loadFiles('./src/graphql/**/*.graphql'),
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault()
    ]
  });
  await server.start();
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token })
    })
  );
};

export default useGraphql;
