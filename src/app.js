const path = require('path')
const express = require('express')
const http = require('http')
const app = express()
require('dotenv').config()
const hbs = require('hbs')
const router = require('./routers/router')
const socketio = require('socket.io')
const {reserveGeocode} = require('./utils/geocode')

// Define Paths for Express Config
const assets = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const server = http.createServer(app)
const io = socketio(server)


Number.prototype.countDecimals = function () {

    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;

    var str = this.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
}


io.on('connection', (socket) => {
    socket.on('searchByLocation', ({latitude, longitude}, error) =>{
        latitude.countDecimals() >= 6 ? latitude = latitude.toFixed(latitude.countDecimals() -4) : latitude
        longitude.countDecimals() >= 6 ? longitude = longitude.toFixed(longitude.countDecimals() -4) : longitude

  
        reserveGeocode(longitude, latitude).then((address) => {
            socket.emit('reserveGeocode', {
                address
            }, (error) => {
                if(error) {
                    return console.log(error)
                }
            })
        })
    })
})

//Setting up handlebars engine and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Adding static directory for assets
app.use(express.static(assets))
app.use(router)

module.exports  = server
