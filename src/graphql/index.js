import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default'
import { expressMiddleware } from '@apollo/server/express4'

const typeDefs = `
type Query {
    hello: String!
}
`
const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
}

const useGraphql = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageLocalDefault()
    ]
  })
  await server.start()
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token })
    })
  )
}

export default useGraphql
