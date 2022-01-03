require('dotenv').config()
const request = require('postman-request')
const apiKey = process.env.MAPBOX_API_KEY


const forwardGeocode = (address) => {
    return new Promise((resolve, reject) => {
        if (address.length === 0) {
            return console.log('Give me a location to check the weather of.')
        } else {
            const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + encodeURIComponent(apiKey) + '&limit=1'
            request({
                url,
                json: true
            }, (error, { body }) => {
                if (error) {
                    reject('Unable to connect to the location API.')
                } else if (body.features.length === 0) {
                    reject('The location requested does not return any results. Please try being more specific.')
                } else {
                    resolve(
                        {
                            latitude: body.features[0].geometry.coordinates[1],
                            longitude: body.features[0].geometry.coordinates[0]
                        })

                }
            })
        }
    })
}



module.exports = {
    forwardGeocode: forwardGeocode
}