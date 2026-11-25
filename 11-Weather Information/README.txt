Experiment 11 - Weather Information

Aim:
To get a city's current weather from a public weather API using Fetch.

Basic algorithm:
1. Read the city name entered by the user.
2. Send the name to Open-Meteo's geocoding API.
3. If a location is found, use its latitude and longitude to request weather data.
4. Display temperature, humidity and a readable weather condition.
5. Show a helpful message if the city is not found or a request fails.

Important JavaScript concepts:
Fetch API, async/await, functions, if statements, try/catch and DOM manipulation.

How to execute:
Open index.html in a browser with an internet connection. No API key is needed.

Expected output:
The page displays current temperature, humidity and weather conditions for the city.
An error message appears for an unknown city or an unavailable API.
