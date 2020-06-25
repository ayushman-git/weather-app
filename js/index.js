window.addEventListener("load", () => {
  let long, lat;
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(".temperature-description");
  let locationIcon = document.querySelector(".location-icon");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=ae3720f4b81244fd99737ca75bb804ea`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(weatherData => {
          console.log(weatherData);
          const { city_name, clouds, temp, timezone, uv, weather } = weatherData.data[0];
          console.log(city_name, clouds, temp, timezone, uv, weather);
          locationTimezone.textContent = city_name;
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = weather.description;

          setIcons(weather);
        })
    })
  }
  else {
    document.getElementById("location-timezone").innerText = "Allow geolocation access."
  }

  function setIcons(weather) {
    const currentIconId = weather.code;
    if (currentIconId === '801') {
      locationIcon.setAttribute("src", "./assets/weather_svg/day.svg")
    }
  }
});