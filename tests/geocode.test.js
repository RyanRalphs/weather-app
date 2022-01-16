jest.mock('../src/utils/geocode.js')
const mockGeocode = jest
    .fn()
    .mockImplementation(async (address) => {
        return new Promise((resolve, reject) => {
            if (address === 'Oswestry') {
                resolve({ latitude: 52.8598, longitude: -3.0538 })
            } else {
                reject('The location requested does not return any results. Please try being more specific.')
            }
        })
    })

test('I can forward geocode an address', async () => {
    await mockGeocode('Oswestry')
    .then((result) => {
        expect(result).toStrictEqual({ latitude: 52.8598, longitude: -3.0538 })
    })
})

test('I get an error if I do not provide a valid address', async () => {
    await mockGeocode('!')
    .then().catch((error) => {
        expect(error).toBe('The location requested does not return any results. Please try being more specific.')
    })
})

