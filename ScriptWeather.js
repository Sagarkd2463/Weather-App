//getting all the references
const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

//sending api request to fetch data base on city with related details
async function checkWeather(city) {
    const api_key = "";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then((response) => response.json());

    if(weather_data.cod === `404`) { //location is not proper then a 404 image is shown
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }
    //if entered city is valid then display relevant details
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round (weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    //based on weather data switch between images 
    switch(weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "Weather/cloud.png";
            break;

        case 'Clear':
            weather_img.src = "Weather/clear.png";
            break;
               
        case 'Rain':
            weather_img.src = "Weather/rain.png";
            break;

        case 'Mist':
            weather_img.src = "Weather/mist.png";
            break;

        case 'Snow':
            weather_img.src = "Weather/snow.png";
            break;
    }
}

//an event on search button to get user input data to fetch details from checkWeather 
searchBtn.addEventListener("click", () => {
    checkWeather(inputBox.value);
});
