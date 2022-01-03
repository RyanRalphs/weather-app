require('dotenv').config()
const request = require('postman-request')
const apiKey = process.env.WEATHERSTACK_API_KEY

const forecast = (lat, long = 50) => {
    return new Promise((resolve, reject) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + decodeURIComponent(apiKey) + '&query=' + decodeURIComponent(lat) + ',' + decodeURIComponent(long)
    request({
        url,
        json: true
    }, (error, {body}) => {
            if (error) {
                reject('Unable to connect to the weather API.')
            } else if (body.error) {
                
                       reject( body.error.info )
            } else {
                resolve(body.current)
            }

    })
})
}


    

        // (error, { body }) => {
            // if (error) {
            //     callback('Unable to connect to the weather API.', undefined)
            // } else if (body.error) {
            //     callback(
            //         {
            //             error: body.error.info,
            //             undefined
            //         }
            //     )
            // } else {
            //     callback(undefined, body.current)
            // }
        // })
// }

module.exports = {
    forecast: forecast
}