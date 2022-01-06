const path = require('path')
const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 3000
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const photos = require('./utils/places')


// Define Paths for Express Config
const assets = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



//Setting up handlebars engine and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Adding static directory for assets
app.use(express.static(assets))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather!',
        name: 'Ryan Ralphs'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ryan Ralphs'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        message: 'This is a help message',
        name: 'Ryan Ralphs'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    let address = req.query.address
    address = address.toLowerCase()

    geocode.forwardGeocode(address).then(async ({ longitude, latitude }) => {
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
    }).catch((errorWithGeocoding) => {
        res.send({ errorWithGeocoding })
    })
})




app.get('/weather/api', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    let address = req.query.address
    address = address.toLowerCase()

    geocode.forwardGeocode(address).then(async ({ longitude, latitude }) => {
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
    }).catch((errorWithGeocoding) => {
        res.send({ errorWithGeocoding })
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Oooopsy!',
        name: 'Ryan Ralphs',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Oooopsy!',
        name: 'Ryan Ralphs',
        errorMessage: 'This page doesnt exist. Try going somewhere else.'
    })
})

app.listen(port, () => {
    console.log('Server is running on ' + port)
})
