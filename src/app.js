const path = require('path')
const express = require('express')
const app = express()
require('dotenv').config()
const hbs = require('hbs')
const router = require('./routers/router')

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
app.use(router)

module.exports  = app
