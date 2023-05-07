// temperature
function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#temperature-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
  iconElement.setAttribute("alt", response.data.condition.description);
}

function search(city) {
  let apiKey = "843cf8b9d864b4563f40bt2o7a52f5ef";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unites=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
search("Zürich");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// click city

// date and time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 9) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday, ",
    "Monday, ",
    "Tuesday, ",
    "Wednesday, ",
    "Thursday, ",
    "Friday, ",
    "Saturday, ",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
// forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (weekday) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
              <div class="weather-forecast-day"> ${weekday} </div>
              <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" alt
                                    width="42"/>             
                                    <br>
                                  
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-max"> 18º </ span>
            <span class="weather-forecast-min"> 10º </ span>
          </div>
          </div>
      
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
