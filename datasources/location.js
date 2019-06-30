const NodeGeocoder = require('node-geocoder')
const { RESTDataSource } = require('apollo-datasource-rest')

class LocationAPI extends RESTDataSource {
  constructor() {
    super()
    this.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY
    this.mapLinkBase = 'https://www.google.com/maps/?q='
  }

  getLocation(place) {
    const options = {
      apiKey: this.googleMapsApiKey,
      provider: 'google',
    }

    const geocoder = NodeGeocoder(options)

    return new Promise((resolve, reject) => {
      geocoder.geocode(place, (err, res) => {
        if (err) {
          reject(err)
        }
        const { city, country, latitude: lat, longitude: lng } = res[0]
        resolve({
          city,
          country,
          coords: [lat, lng],
          mapLink: `${this.mapLinkBase}${lat},${lng}`,
        })
      })
    })
  }
}

module.exports = LocationAPI
