const socket = io();
const messageOne = document.querySelector("#loadingMessage");
const weatherSearch = document.querySelector("form");
const search = document.querySelector("input");
var spinner = document.querySelector("#spinner");
const searchByLocation = document.querySelector("#searchByLocation");

function autoSearch(address) {
 location.assign("/weather?address=" + encodeURIComponent(address));
}

searchByLocation.addEventListener("click", (event) => {
  event.preventDefault();
  if (!navigator.geolocation) {
    return alert("Your browser is too old.");
  }


  messageOne.textContent = "Finding by location...";
  navigator.geolocation.getCurrentPosition(({coords}) => {
    socket.emit("searchByLocation", {
        latitude: coords.latitude,
            longitude: coords.longitude
    }, (error) => {
      if (error) {
        return console.log(error);
      }
    });
  });

  socket.on("reserveGeocode", ({address}) => {
    autoSearch(address.text);
  });
});

var element = document.getElementById("searchButton");
if (element) {
  weatherSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    messageOne.textContent = "Finding your weather...";
    const address = search.value;
    fetch("/weather/api?address=" + encodeURIComponent(address)).then(
      (response) => {
        response.json().then((data) => {
          if (data.error) {
            return (messageOne.textContent = data.error);
          } else if (data.errorWithGeocoding) {
            return (messageOne.textContent = data.errorWithGeocoding);
          } else if (data.errorWithPhoto) {
            return (messageOne.textContent = data.errorWithPhoto);
          } else if (data.errorWithUrl) {
            return (messageOne.textContent = data.errorWithUrl);
          }
          spinner.style.display = "block";
          location.assign("/weather?address=" + encodeURIComponent(address));
        });
      }
    );
  });
}
