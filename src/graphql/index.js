import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { expressMiddleware } from '@apollo/server/express4';
import { loadFiles } from '@graphql-tools/load-files';
import { resolvers } from './resolver.js';
import { buildContext } from 'graphql-passport';
import { typeDefs as scalarsTypeDefs, resolvers as scalarsResolvers } from 'graphql-scalars';

/**
 * Initializes and configures Apollo Server for GraphQL.
 * @param {Object} app - The Express app object.
 * @returns {Promise<void>} - A promise that resolves when the server is started.
 */
const useGraphql = async (app) => {
  const typeDefs = [
    ...await loadFiles('./src/graphql/**/*.graphql'),
    scalarsTypeDefs
  ];
  const allResolvers = [
    resolvers,
    scalarsResolvers
  ];
  const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers,
    playground: true,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault()
    ]
  });
  await server.start();
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: ({ req, res }) => buildContext({ req, res })
    })
  );
};

export default useGraphql;
