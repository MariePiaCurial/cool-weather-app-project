let now = new Date();
let hours = now.getHours();
let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";

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
}
