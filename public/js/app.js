const socket = io();
const messageOne = document.querySelector("#loadingMessage");
const weatherSearch = document.querySelector("form");
const search = document.querySelector("input");
const searchByLocation = document.querySelector("#searchByLocation");
const mainBody = document.querySelector('.main-body')
const weatherBody = document.querySelector('.weather-body')
const weatherImg = document.querySelector('.weatherImage')
const imgAddress = document.querySelector('#weather-address')
const imgForecast = document.querySelector('.top-right')

messageOne.textContent = "Have a go!";


function autoSearch(address) {
  location.assign("/weather?address=" + encodeURIComponent(address));
}

searchByLocation.addEventListener("click", (event) => {
  event.preventDefault();
  if (!navigator.geolocation) {
    return alert("Your browser is too old.");
  }

  messageOne.textContent = "Finding by location...";
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    socket.emit(
      "searchByLocation",
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      (error) => {
        if (error) {
          return console.log(error);
        }
      }
    );
  });

  socket.on("reserveGeocode", ({ address }) => {
    autoSearch(address.text);
  });
});

var element = document.getElementById("searchButton");
if (element) {
  weatherSearch.addEventListener("submit", (event) => {
    event.preventDefault(); 
    mainBody.style.float = 'left'
    messageOne.textContent = "Finding your weather...";
    const address = search.value;
    fetch("/weather/api?address=" + encodeURIComponent(address)).then(
      (response) => {
        response.json().then((data) => {
          console.log(data)
          if (data.error) {
            return (messageOne.textContent = data.error);
          } else if (data.errorWithGeocoding) {
            return (messageOne.textContent = data.errorWithGeocoding);
          } else if (data.errorWithPhoto) {
            return (messageOne.textContent = data.errorWithPhoto);
          } else if (data.errorWithUrl) {
            return (messageOne.textContent = data.errorWithUrl);
          }

          weatherImg.setAttribute('src', data.photoUrl)
          imgAddress.textContent = data.address + "'s Weather"
          imgForecast.textContent = `${data.forecast}`
          weatherBody.style.display = 'inline'
        });
      }
    );
  });
}
