getBackgroundImage()

async function getBackgroundImage() {
    const response = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=crypto')
    const data = await response.json()
    renderElements(data)
}

function renderElements(link) {
    document.body.style.backgroundImage = `url(${link.urls.full})`
    document.getElementById("photo-author").innerText = `📸 by ${link.user.name}`
}

function getTime() {
    const timeNow = new Date()
    document.getElementById('time-now').innerText = timeNow.toLocaleTimeString("en-us", {timeStyle: "short"})
    setInterval(getTime, 1000)
}
getTime()

function getWeather (){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
                .then(response => {
                    if (!response.ok) {
                        throw Error ('Weather data not available')
                    } 
                    return response.json()
                })
                .then(data => {
                    document.getElementById('weather').innerHTML = `
                        <div id="weather-icons">
                            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                            <p>${Math.floor(data.main.temp)}°</p>
                        </div>
                        <p>${data.name}</p>   
                    `
                })
                .catch(err => console.error(err))  
        });          
    }
}
getWeather()

function getCoinFeed() {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
        .then(response => {
            if (!response.ok) {
                throw Error ('Coin information not available')
            }
            return response.json()
        })
        .then(data => {
            
        document.getElementById('crypto-top').innerHTML = `
            <img src="${data.image.thumb}>"
            <p>${data.name }</p>
        `
        document.getElementById('crypto').innerHTML += `
            <p>🎯$${data.market_data.current_price.usd}</p>
            <p class="green">👍 $${data.market_data.high_24h.usd}</p>
            <p class="red">👎 $${data.market_data.low_24h.usd}</p>
        `
        })
        .catch(err => console.error(err))
}
getCoinFeed()