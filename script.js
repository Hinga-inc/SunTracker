const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

searchButton.addEventListener("click", () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        alert("Please enter a City name");
    }
});

function fetchWeather(location) {
    const url = `/weather?location=${encodeURIComponent(location)}`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.message || "Weather data not available");
                });
            }
            return response.json();
        })
        .then((data) => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;

            document.body.style.backgroundImage = `url('backgrounds/${data.weather[0].icon}.jpg')`;
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            locationElement.textContent = "Error";
            temperatureElement.textContent = "";
            descriptionElement.textContent = error.message;
            document.body.style.backgroundImage = "url('backgrounds/error.jpg')";
        });
}