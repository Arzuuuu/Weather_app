const url =
  "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=hyderabad";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "eb688a0377msh651bf67f007bc41p1bba77jsn007010b82a1b",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

const getWeather = (city) => {
  const cityName = document.getElementById("cityName");
  cityName.innerHTML = city;

  fetch(
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" + city,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      const temp = document.getElementById("temp");
      temp.innerHTML = response.temp + " °C";
      const feels_like = document.getElementById("feels_like");
      feels_like.innerHTML = response.feels_like + " °C";
      
      const humidity = document.getElementById("humidity");
      humidity.innerHTML = response.humidity + " %";
      
      const min_temp = document.getElementById("min_temp");
      min_temp.innerHTML = response.min_temp + " °C";
      const max_temp = document.getElementById("max_temp");
      max_temp.innerHTML = response.max_temp + " °C";

      // Convert wind speed from m/s to km/h
      const wind_speed_mps = response.wind_speed;
      const wind_speed_kph = (wind_speed_mps * 3.6).toFixed(2);

      const wind_speed = document.getElementById("wind_speed");
      wind_speed.innerHTML = wind_speed_kph + " km/h";

      const sunriseTimestamp = response.sunrise;
      const sunsetTimestamp = response.sunset;

      const sunriseDate = new Date(sunriseTimestamp * 1000);
      const sunsetDate = new Date(sunsetTimestamp * 1000);

      const sunriseTime = sunriseDate.toLocaleTimeString();
      const sunsetTime = sunsetDate.toLocaleTimeString();

      const sunrise = document.getElementById("sunrise");
      sunrise.innerHTML = sunriseTime;
      const sunset = document.getElementById("sunset");
      sunset.innerHTML = sunsetTime;


      const backgroundUrl = `https://source.unsplash.com/1600x900/?weather,sunlight,landscape,tornado,storm,time=${Date.now()}`;
      document.body.style.backgroundImage = `url('${backgroundUrl}')`;
    
    })
    .catch((err) => console.error(err));
};

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const cityInput = document.getElementById("city");
    const city = cityInput.value;
    getWeather(city);
  });

  getWeather("Delhi");
});
