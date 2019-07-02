const { ApolloServer } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const LocationAPI = require('./datasources/location')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')

require('dotenv').config()

const server = new ApolloServer({
  dataSources: () => {
    return {
      locationAPI: new LocationAPI(),
    }
  },
  schema: buildFederatedSchema([
    {
      resolvers,
      typeDefs,
    },
  ]),
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
