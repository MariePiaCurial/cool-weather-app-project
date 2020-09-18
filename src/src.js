let now = new Date();
let hours = now.getHours();
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let lat;
let lon;
let measure = "c";

// 1) Create function currentTime : display current Date, Hour

function currentTime() {
  let h3 = document.querySelector("h3");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday ",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  h3.innerHTML = `${day}`;

  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let month = now.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let year = now.getFullYear();
  let h4 = document.querySelector("h4");
  h4.innerHTML = `${date}.${month}.${year}`;

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${hours}:${minutes}`;
}
currentTime();

// 2) Display current temperature if ask city

function showTemperature(event) {
  event.preventDefault();

  // display current temperature (API data)

  document.querySelector("h1").innerHTML = document.querySelector(
    "#city-input"
  ).value;
  let city = document.querySelector("h1").innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then((response) => {
    let temperature = Math.round(response.data.main.temp);
    let weather = document.querySelector("#temperature");
    weather.innerHTML = temperature;

    // display weather description (API data)

    let description = response.data.weather[0].description;
    let descriptionWeather = document.querySelector("p");
    descriptionWeather.innerHTML = description;

    // link current weather element to API data

    let humidity = response.data.main.humidity;
    let currentHumidity = document.querySelector("#humidity");
    currentHumidity.innerHTML = `${humidity}%`;

    let wind = Number(response.data.wind.speed);
    let currentWind = document.querySelector("#wind");
    currentWind.innerHTML = Math.round(wind * 1.609) + "km/h";

    let cloudiness = response.data.clouds.all;
    let currentCloudiness = document.querySelector("#cloudiness");
    currentCloudiness.innerHTML = `${cloudiness}%`;

    // Link icon to weather description (API data)

    let icon = response.data.weather[0].icon;
    let hours = now.getHours();

    if (hours <= 6 || hours >= 19) {
      icon = "01n";
    } else if (icon === "03d" || icon === "04d") {
      icon = "02d";
    } else if (icon == "09d") {
      icon = "10d";
    } else {
      icon = "01d";
    }

    let currentIcon = document.querySelector(".icon");
    currentIcon.innerHTML = `<img class='icon' src='http://openweathermap.org/img/wn/${icon}@2x.png' width='30px'></img>`;

    //link background to weather description (API data)

    document.querySelector(".container").style.background = `linear-gradient(
    rgba(247, 235, 230,0.8),
    rgba(233, 197, 168,0.8),
    rgba(212, 82, 1,0.8)
  ), url('assets/${icon}.jpg')`;
  });

  // display forecast temp if ask city

  function ForecastedTemp() {
    axios.get(apiUrl).then((response) => {
      let latitude = response.data.coord.lat;
      let longitude = response.data.coord.lon;
      let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

      axios.get(url).then((response) => {
        let morningForecast = Math.round(response.data.daily[0].temp.morn);
        let morningForecastTemp = document.querySelector(
          ".morningForecastTemp"
        );
        morningForecastTemp.innerHTML = `${morningForecast}`;

        let afternoonForecast = Math.round(response.data.daily[0].temp.eve);
        let afternoonForecastTemp = document.querySelector(
          ".afternoonForecastTemp"
        );
        afternoonForecastTemp.innerHTML = `${afternoonForecast}`;
        let nightforecast = Math.round(response.data.daily[0].temp.night);
        let nightforecastTemp = document.querySelector(".nightforecastTemp");
        nightforecastTemp.innerHTML = `${nightforecast}`;
      });
    });
  }
  ForecastedTemp();
}

let form = document.querySelector("form");
form.addEventListener("submit", showTemperature);

// 3) Display current temperature in current position - navigator reference

function showPosition(position) {
  //  API response = city name if retrieve current position
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then((response) => {
    let city = response.data.name;
    document.querySelector("h1").innerHTML = city;

    // Display current temperature in current position (Data API)

    let temperature = Math.round(response.data.main.temp);
    let weather = document.querySelector("#temperature");
    weather.innerHTML = temperature;

    // Display current weather description & elements in current position (Data API)

    let description = response.data.weather[0].description;
    let descriptionWeather = document.querySelector("p");
    descriptionWeather.innerHTML = description;

    let humidity = response.data.main.humidity;
    let currentHumidity = document.querySelector("#humidity");
    currentHumidity.innerHTML = `${humidity}%`;

    let wind = Number(response.data.wind.speed);
    let currentWind = document.querySelector("#wind");
    currentWind.innerHTML = Math.round(wind * 1.609) + "km/h";

    let cloudiness = response.data.clouds.all;
    let currentCloudiness = document.querySelector("#cloudiness");
    currentCloudiness.innerHTML = `${cloudiness}%`;

    // Link icon & background to weather in current position (Data API)

    let icon = response.data.weather[0].icon;

    if (hours <= 6 || hours >= 19) {
      icon = "01n";
    } else if (icon === "03d" || icon === "04d") {
      icon = "02d";
    } else if (icon == "09d") {
      icon = "10d";
    } else {
      icon = "01d";
    }

    document.querySelector(".container").style.background = ` linear-gradient(
    rgba(247, 235, 230,0.8),
    rgba(233, 197, 168,0.8),
    rgba(212, 82, 1,0.8)), url('assets/${icon}.jpg')`;

    let currentIcon = document.querySelector(".icon");
    currentIcon.innerHTML = `<img class='icon' src='http://openweathermap.org/img/wn/${icon}@2x.png' width='30px'></img>`;
    // display forecast temp if display current location

    function ForecastedTemp(position) {
      let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      axios.get(url).then((response) => {
        let morningForecast = Math.round(response.data.daily[0].temp.morn);
        let morningForecastTemp = document.querySelector(
          ".morningForecastTemp"
        );
        morningForecastTemp.innerHTML = `${morningForecast}`;

        let afternoonForecast = Math.round(response.data.daily[0].temp.eve);
        let afternoonForecastTemp = document.querySelector(
          ".afternoonForecastTemp"
        );
        afternoonForecastTemp.innerHTML = `${afternoonForecast}`;
        let nightforecast = Math.round(response.data.daily[0].temp.night);
        let nightforecastTemp = document.querySelector(".nightforecastTemp");
        nightforecastTemp.innerHTML = `${nightforecast}`;
      });
    }
    ForecastedTemp();
  });
}
// 4) Retrieve current position if click
function retrievePosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", retrievePosition);

retrievePosition();

// 5) Conversion Celsius/Fahrenheit

// function convert temp elements °C -> °F
function convertToFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  let temperatureElement1 = document.querySelector(".morningForecastTemp");
  let temperature1 = temperatureElement1.innerHTML;
  let temperatureElement2 = document.querySelector(".afternoonForecastTemp");
  let temperature2 = temperatureElement2.innerHTML;
  let temperatureElement3 = document.querySelector(".nightforecastTemp");
  let temperature3 = temperatureElement3.innerHTML;
  temperature = Number(temperature);
  if (measure == "c") {
    temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
    temperatureElement1.innerHTML = Math.round((temperature1 * 9) / 5 + 32);
    temperatureElement2.innerHTML = Math.round((temperature2 * 9) / 5 + 32);
    temperatureElement3.innerHTML = Math.round((temperature3 * 9) / 5 + 32);
  }
  measure = "f";
}

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// function convert  temp elements  °F -> °C

function convertToCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  let temperatureElement1 = document.querySelector(".morningForecastTemp");
  let temperature1 = temperatureElement1.innerHTML;
  let temperatureElement2 = document.querySelector(".afternoonForecastTemp");
  let temperature2 = temperatureElement2.innerHTML;
  let temperatureElement3 = document.querySelector(".nightforecastTemp");
  let temperature3 = temperatureElement3.innerHTML;
  temperature = Number(temperature);
  if (measure == "f") {
    temperatureElement.innerHTML = Math.round((temperature - 32) * (5 / 9));
    temperatureElement1.innerHTML = Math.round((temperature1 - 32) * (5 / 9));
    temperatureElement2.innerHTML = Math.round((temperature2 - 32) * (5 / 9));
    temperatureElement3.innerHTML = Math.round((temperature3 - 32) * (5 / 9));
  }
  measure = "c";
}

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", convertToCelsius);
