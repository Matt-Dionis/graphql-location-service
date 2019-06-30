module.exports = {
  Query: {
    location: async (_, { place }, { dataSources }) =>
      await dataSources.locationAPI.getLocation(place),
  },
  Location: {
    weather(location) {
      return { __typename: 'Weather', coords: location.coords }
    },
  },
}
