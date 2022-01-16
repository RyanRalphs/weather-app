module.export = {
    forecast(lat, long) {
        if(lat.isInteger() && long.isInteger()) {
                return {
                    observation_time: '05:52 PM',
                    temperature: 7,
                    weather_code: 122,
                    weather_icons: [
                      'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png'
                    ],
                    weather_descriptions: [ 'Overcast' ],
                    wind_speed: 19,
                    wind_degree: 304,
                    wind_dir: 'NW',
                    pressure: 1027,
                    precip: 0,
                    humidity: 87,
                    cloudcover: 100,
                    feelslike: 4,
                    uv_index: 2,
                    visibility: 10,
                    is_day: 'no'
                  }
        }
    },

}