const forecast = require('../src/utils/forecast')


test('I can get weather information when providing a latitude and longitude', async () => {
    await forecast.forecast(52.8598, 3.0538)
    .then((result) => {
        result = JSON.stringify(result)
        expect(result).toContain('weather_descriptions')
    })
})
 
test('I cant get weather information when not providing a latitude and longitude', async () => {
    await forecast.forecast('')
    .then().catch((error) => {
        expect(error).toBe('Your API request failed. Please try again or contact support.')
    })
})
