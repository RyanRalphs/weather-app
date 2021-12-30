const { Client } = require("@googlemaps/google-maps-services-js");
const request = require('postman-request')
const client = new Client({});
require('dotenv').config()
const apiKey = process.env.GOOGLE_API_KEY


const getPhotoReference = (searchQuery, lat, long, callback) => {
    client
        .textSearch({
            params: {
                query: searchQuery,
                location: [lat, long],
                key: apiKey
            },
            timeout: 1000,
        })
        .then((response) => {
            callback(undefined,
                response.data.results[0].photos[0].photo_reference
            )
        })
        .catch((error) => {
            callback('Could not find a photo for this location - Currently only supports locations such as Texas, Oswestry etc.', undefined)
        });
}

const getPhotoUrl = (photoReference, callback) => {
    const url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&chunked_encoding=true&photo_reference=' + decodeURIComponent(photoReference) + '&key=' + decodeURIComponent(apiKey)
    request({
        url,
        json: true
    },
        (error, body) => {
            if (error) {
                callback('Something went wrong trying to fetch the mirror from Google.', undefined)
            } else if (body.error) {
                callback(
                    {
                        error: body.error.info,
                        undefined
                    }
                )
            } else {
                callback(undefined, 'https://lh3.googleusercontent.com' + body.client._httpMessage.path)
            }
        })
}

module.exports = {
    getPhotoReference: getPhotoReference,
    getPhotoUrl: getPhotoUrl
}