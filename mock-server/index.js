/**
 * GraphQL / iQL server
 *
 * @package: HoloREA
 * @author:  pospi <pospi@spadgos.com>
 * @since:   2019-03-18
 */

const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { express: voyagerMiddleware } = require('graphql-voyager/middleware')
const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')

const SERVER_PORT = 3000
const SCHEMA_VIEWER_PATH = '/viewer'

const typeDefs = require('@valueflows/vf-graphql').typeDefs

const schema = makeExecutableSchema({ typeDefs })
addMockFunctionsToSchema({ schema })

const server = new ApolloServer({ schema })

const app = express()
server.applyMiddleware({ app })

app.use(SCHEMA_VIEWER_PATH, voyagerMiddleware({
  endpointUrl: server.graphqlPath,
  displayOptions: {
    hideRoot: true,
    showLeafFields: false,
  },
}));

app.listen({ port: SERVER_PORT }, () =>
  console.log(`🚀🚀🚀
    Query browser at http://localhost:${SERVER_PORT}${server.graphqlPath}
    Schema visualiser at http://localhost:${SERVER_PORT}${SCHEMA_VIEWER_PATH}
🚀🚀🚀`)
)
