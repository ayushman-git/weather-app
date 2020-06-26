// let farenheight = temp * 9/5 + 32;

window.addEventListener("load", () => {
  let long, lat;
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(".temperature-description");
  // let locationIcon = document.querySelector(".location-icon");
  // let bodyBackground = document.getElementsByTagName("body");

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
          const { city_name, clouds, temp, timezone, uv, weather, pod } = weatherData.data[0];
          console.log(city_name, clouds, temp, timezone, uv, weather);
          locationTimezone.textContent = city_name;
          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = weather.description;
          setIcons(weather, pod);
        })
    })
  }
  else {
    document.getElementById("location-timezone").innerText = "Allow geolocation access."
  }

  function setIcons(weather, pod) {
    const currentIconId = weather.code;
    const currentPod = pod;
    if (currentIconId === '800' && currentPod === 'd') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/sun-weather.json"
      });
    }
    else if(currentIconId === '800' && currentPod === 'n') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/night-weather.json"
      });
    }
    else if(currentIconId === '801' || currentIconId === '802' || currentIconId === '803' || currentIconId === '804'  && currentPod === 'd') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/cloudy-weather.json"
      });
    }
    else if(currentIconId === '500' || currentIconId === '501' || currentIconId === '511' || currentIconId === '520' || currentIconId === '521' || currentIconId === '300' || currentIconId === '301' || currentIconId === '302') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/rainy-weather.json"
      });
    }
    else if(currentIconId === '200' || currentIconId === '201' || currentIconId === '202' || currentIconId === '230' || currentIconId === '231' || currentIconId === '232' || currentIconId === '233') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/stormy-weather.json"
      });
    }
    else if(currentIconId === '502' || currentIconId === '522') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/torrential-rain-weather.json"
      });
    }
    else if(currentIconId === '600' || currentIconId === '601' || currentIconId === '610' || currentIconId === '611' || currentIconId === '621') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/light-snowy-weather.json"
      });
    }
    else {
      console.log("Weather code not matched.")
    }
  }
  // function changeBackgroundColor(bodyBackground) {
  //   bodyBackground.style.background = "linear-gradient(to right, #ff0099, #493240)"
  // }
});

