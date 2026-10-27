const apiKey = "b04fd0c477bf419eb07142633262710";
const apiUrl = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city = "Mansoura") {
  if (!city) return;

  const response = await fetch(apiUrl + city);

  // WeatherAPI returns 400 status for invalid city names
  if (!response.ok) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  }

  const data = await response.json();

  document.querySelector(".city").innerHTML = data.location.name;
  document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
  document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
  document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

  const condition = data.current.condition.text.toLowerCase();

  if (condition.includes("cloud")) {
    weatherIcon.src = "./Images/cloudy.png";
  } else if (condition.includes("clear") || condition.includes("sunny")) {
    weatherIcon.src = "./Images/sunny.png";
  } else if (condition.includes("rain")) {
    weatherIcon.src = "./Images/cloudy.png";
  } else if (condition.includes("drizzle") || condition.includes("thundery")) {
    weatherIcon.src = "./Images/heavy-rain.png";
  } else if (condition.includes("mist") || condition.includes("fog")) {
    weatherIcon.src = "./Images/fog.png";
  } else if (condition.includes("snow")) {
    weatherIcon.src = "./Images/snowflake.png";
  }

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

checkWeather("Mansoura");
