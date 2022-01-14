// const request = require('supertest')
// const app = require('../src/app')
// const geocode = require('../src/utils/geocode')

// test('I can get to a route and have set up testing for express properly', async () => {
//     await request(app)
//         .get('/help').expect(200).then(({text}) => {
//             expect(text).toContain('This is a help message')
//         })
// })

// test('I can forward geocode an address', async () => {
//     await geocode.forwardGeocode('Oswestry')
//     .then((result) => {
//         expect(result).toStrictEqual({ latitude: 52.8598, longitude: -3.0538 })
//     })
// })

// test('I get an error if I do not provide a valid address', async () => {
//     await geocode.forwardGeocode('!')
//     .then().catch((error) => {
//         expect(error).toBe('The location requested does not return any results. Please try being more specific.')
//     })
// })

