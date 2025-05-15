const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const description = document.getElementById("description");
const temperature = document.getElementById("temperature");
const weatherResult = document.getElementById("weather-result");
const errorMessage = document.getElementById("error-message");


const API_KEY = "f06f0257ab634ac5bce172541251505";

searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
  
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
  
      if (data.error) {
        weatherResult.classList.add("hidden");
        errorMessage.textContent = "City not found. Try again.";
        errorMessage.classList.remove("hidden");
        return;
      }
  
      cityName.textContent = `${data.location.name}, ${data.location.country}`;
      description.textContent = data.current.condition.text;
      temperature.textContent = `🌡️ ${data.current.temp_f} °F`;
      weatherIcon.src = `https:${data.current.condition.icon}`;
  
      document.getElementById("feels-like").textContent = `Feels like: ${data.current.feelslike_f} °F`;
      document.getElementById("humidity").textContent = `💧 Humidity: ${data.current.humidity}%`;
      document.getElementById("wind-speed").textContent = `🌬️ Wind: ${data.current.wind_mph} mph`;
  
      errorMessage.classList.add("hidden");
      weatherResult.classList.remove("hidden");
    } catch (error) {
      console.error("Fetch error:", error);
      errorMessage.textContent = "Something went wrong.";
      errorMessage.classList.remove("hidden");
      weatherResult.classList.add("hidden");
    }
  });