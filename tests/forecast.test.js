jest.mock("../src/utils/forecast.js");
const mockForecast = jest.fn().mockImplementation(async (lat, long) => {
  return new Promise((resolve, reject) => {
    Number(lat) !== NaN && Number(long) !== NaN
      ? resolve({
          observation_time: "05:52 PM",
          temperature: 7,
          weather_code: 122,
          weather_icons: [
            "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png",
          ],
          weather_descriptions: ["Overcast"],
          wind_speed: 19,
          wind_degree: 304,
          wind_dir: "NW",
          pressure: 1027,
          precip: 0,
          humidity: 87,
          cloudcover: 20,
          feelslike: 4,
          uv_index: 2,
          visibility: 10,
          is_day: "no",
        })
      : reject("Your API request failed. Please try again or contact support.");
  });
});

test("I can get weather information when providing a latitude and longitude", async () => {
  await mockForecast(52.8598, 3.0538).then((result) => {
    result = JSON.stringify(result);
    expect(result).toContain("weather_descriptions");
  });
});

test("I cant get weather information when not providing a latitude and longitude", async () => {
  await mockForecast()
    .then()
    .catch((error) => {
      console.log(error);
      expect(error).toBe(
        "Your API request failed. Please try again or contact support."
      );
    });
});
