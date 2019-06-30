const { gql } = require('apollo-server')

module.exports = gql`
  extend type Query {
    location(place: String!): Location
  }

  type Location {
    city: String
    country: String
    coords: [Float]
    mapLink: String
    weather: Weather
  }

  extend type Weather @key(fields: "coords") {
    coords: [Float] @external
  }
`
