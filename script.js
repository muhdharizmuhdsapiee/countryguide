const searchBtn = document.querySelector('#search-btn')
const countryInput = document.querySelector('#country-input')
const result = document.querySelector('#result')

function displayCountry() {
    const countryName = countryInput.value
    const fullURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    fetch(fullURL)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        // console.log(data[0].capital)
        // console.log(data[0].name.common)
        // console.log(data[0].flags.svg)
        // console.log(Object.values(data[0].languages).join(', '))
        
        result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${data[0].capital.toString()}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${data[0].continents.toString()}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${data[0].population.toLocaleString('en-US')}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Common Language:</h4>
                <span>${Object.values(data[0].languages).toString().split(',').join(', ')}</span>
            </div>
        </div>
        `
    })
    .catch(() => {
        if(countryName.length == 0){
            result.innerHTML = `
            <h3>The input field cannot be empty.</h3>
            `
        }
        else{
            result.innerHTML = `
            <h3>Please enter a valid country name.</h3>
            `
        }
    })

    countryInput.value = ""
}

searchBtn.addEventListener('click', displayCountry)

countryInput.addEventListener('keyup', (e) => {
    if(e.key === "Enter"){
        displayCountry()
    }
})