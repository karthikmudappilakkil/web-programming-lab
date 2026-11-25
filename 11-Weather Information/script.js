var weatherForm = document.getElementById("weatherForm");
var cityInput = document.getElementById("cityInput");
var message = document.getElementById("message");
var weatherResult = document.getElementById("weatherResult");

// Convert the weather service's number into readable text.
function getCondition(code) {
  if (code === 0) return "Clear sky";
  if (code === 1 || code === 2) return "Mostly clear";
  if (code === 3) return "Cloudy";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 67) return "Drizzle or rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 95) return "Thunderstorm";
  return "Unknown conditions";
}

weatherForm.addEventListener("submit", async function(event) {
  event.preventDefault();
  var city = cityInput.value.trim();

  if (city === "") {
    message.textContent = "Please enter a city name.";
    weatherResult.textContent = "";
    return;
  }

  message.textContent = "Loading weather...";
  weatherResult.textContent = "";

  try {
    // Find the city's latitude and longitude first.
    var placeUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" +
      encodeURIComponent(city) + "&count=1&language=en&format=json";
    var placeResponse = await fetch(placeUrl);
    if (!placeResponse.ok) {
      throw new Error("Could not contact the location service.");
    }

    var placeData = await placeResponse.json();
    if (!placeData.results || placeData.results.length === 0) {
      message.textContent = "City not found. Check the spelling and try again.";
      return;
    }

    var place = placeData.results[0];
    var weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" +
      place.latitude + "&longitude=" + place.longitude +
      "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code";
    var weatherResponse = await fetch(weatherUrl);
    if (!weatherResponse.ok) {
      throw new Error("Could not load weather data.");
    }

    var weatherData = await weatherResponse.json();
    var current = weatherData.current;
    var location = place.name + (place.country ? ", " + place.country : "");

    // Use textContent so API text is displayed as text, not interpreted as HTML.
    weatherResult.textContent = location + " — " + current.temperature_2m +
      " °C, " + getCondition(current.weather_code) +
      ". Feels like " + current.apparent_temperature +
      " °C. Humidity: " + current.relative_humidity_2m + "%.";
    message.textContent = "";
  } catch (error) {
    message.textContent = "Weather is unavailable right now. Please try again.";
  }
});
