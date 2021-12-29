const messageOne = document.querySelector('#loadingMessage')
const weatherSearch = document.querySelector('form')
const search = document.querySelector('input')
var spinner = document.querySelector('#spinner');


var element = document.getElementById('searchButton')
if(element){
weatherSearch.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Finding your weather...'
    const address = search.value
    fetch('/weather/api?address=' + encodeURIComponent(address)).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return messageOne.textContent = data.error
            } else if(data.errorWithGeocoding) {
                return messageOne.textContent = data.errorWithGeocoding
            }
            spinner.style.display = "block"
            location.assign('/weather?address=' + encodeURIComponent(address))
        })
})
})
}