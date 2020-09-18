let now = new Date();
let hours = now.getHours();

// Create function currentTime : display current Date, Hour

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
