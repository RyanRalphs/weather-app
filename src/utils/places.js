const { Client } = require("@googlemaps/google-maps-services-js");
const request = require('postman-request')
const client = new Client({});
require('dotenv').config()
const apiKey = process.env.GOOGLE_API_KEY


const getPhotoReference = (searchQuery, lat, long) => {
    return new Promise((resolve, reject) => {
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
            resolve(response.data.results[0].photos[0].photo_reference)
        })
        .catch((error) => {
            reject('Could not find a photo for this location - Currently only supports locations such as Texas, Oswestry etc.')
        });
})
}

const getPhotoUrl = (photoReference) => {
    return new Promise((resolve, reject) => {

    const url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&chunked_encoding=true&photo_reference=' + decodeURIComponent(photoReference) + '&key=' + decodeURIComponent(apiKey)
    request({
        url,
        json: true
    },
        (error, body) => {
            if (error) {
                reject('Something went wrong trying to fetch the mirror from Google.')
            } else if (body.error) {
                reject(body.error.info)
            } else {
                resolve('https://lh3.googleusercontent.com' + body.client._httpMessage.path)
            }
        })
})
}

module.exports = {
    getPhotoReference: getPhotoReference,
    getPhotoUrl: getPhotoUrl
}