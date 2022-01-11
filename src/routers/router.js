const express = require('express')
const router = new express.Router()
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const photos = require('../utils/places')

router.get('', (req, res) => {
    res.render('index', {
        title: 'Weather!',
        name: 'Ryan Ralphs'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ryan Ralphs'
    })
})

router.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        message: 'This is a help message',
        name: 'Ryan Ralphs'
    })
})

router.get('/weather', async (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    let address = req.query.address
    address = address.toLowerCase()

    try {
        const { latitude, longitude } = await geocode.forwardGeocode(address)
        try {
            const forecastInformation = await forecast.forecast(latitude, longitude)
            try {
                const photoRef = await photos.getPhotoReference(address, latitude, longitude)
                try {
                    const photoUrl = await photos.getPhotoUrl(photoRef)
                    res.render('weather', {
                        title: "Weather",
                        latitude,
                        longitude,
                        forecastInformation,
                        name: 'Ryan',
                        forecast: forecastInformation.weather_descriptions[0],
                        address: address.charAt(0).toUpperCase() + address.slice(1),
                        photoUrl
                    })
                } catch (errorWithPhotoUrl) {
                    res.send({ errorWithPhotoUrl })
                }
            } catch (errorWithPhoto) {
                res.send({ errorWithPhoto })
            }
        } catch (errorWithForecast) {
            res.send({ errorWithForecast })
        }
    } catch (errorWithGeocoding) {
        res.send({ errorWithGeocoding })
    }
})




router.get('/weather/api', async (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    let address = req.query.address
    address = address.toLowerCase()

    try {
        const { latitude, longitude } = await geocode.forwardGeocode(address)
        try {
            const forecastInformation = await forecast.forecast(latitude, longitude)
            try {
                const photoRef = await photos.getPhotoReference(address, latitude, longitude)
                try {
                    const photoUrl = await photos.getPhotoUrl(photoRef)
                    res.send({
                        title: "Weather",
                        latitude,
                        longitude,
                        forecastInformation,
                        name: 'Ryan',
                        forecast: forecastInformation.weather_descriptions[0],
                        address: address.charAt(0).toUpperCase() + address.slice(1),
                        photoUrl
                    })
                } catch (errorWithPhotoUrl) {
                    res.send({ errorWithPhotoUrl })
                }
            } catch (errorWithPhoto) {
                res.send({ errorWithPhoto })
            }
        } catch (errorWithForecast) {
            res.send({ errorWithForecast })
        }
    } catch (errorWithGeocoding) {
        res.send({ errorWithGeocoding })
    }
})



router.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Oooopsy!',
        name: 'Ryan Ralphs',
        errorMessage: 'Help article not found!'
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Oooopsy!',
        name: 'Ryan Ralphs',
        errorMessage: 'This page doesnt exist. Try going somewhere else.'
    })
})


module.exports = router