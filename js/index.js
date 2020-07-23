document.onreadystatechange = function () {
  if (apiLoaded === false) {
    document.querySelector("body").style.visibility = "hidden";
  }
};

let currentMeasurement = "celcius";
let celcius = null;
let fahrenheit = null;
let temperatureDegree = document.querySelector(".temperature-degree");
let degreeName = document.querySelector(".degree-name");
let uvIndex = document.querySelector(".uv-index-text");
let apiLoaded = false;
let dateObj = new Date();
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
let currentDay = dateObj.getDate() + ' ' + months[dateObj.getMonth().toString()];
dateObj.setDate(dateObj.getDate() + 1);
let dayOne = dateObj.getDate() + ' ' + months[dateObj.getMonth().toString()];
dateObj.setDate(dateObj.getDate() + 1);
let dayTwo = dateObj.getDate() + ' ' + months[dateObj.getMonth().toString()];
dateObj.setDate(dateObj.getDate() + 1);
let dayThree = dateObj.getDate() + ' ' + months[dateObj.getMonth().toString()];
dateObj.setDate(dateObj.getDate() + 1);
let dayFour = dateObj.getDate() + ' ' + months[dateObj.getMonth().toString()];
let currentTimeZone = (dateObj.getTimezoneOffset() / 60) * -1;

let cloudBackground = document.querySelector(".clouds-images");

window.addEventListener("load", () => {
  let long, lat;
  let locationTimezone = document.querySelector(".location-timezone");
  let windSpeedText = document.querySelector(".wind-speed-text");
  let temperatureDescription = document.querySelector(".temperature-description");
  let aqiLevel = document.querySelector(".aqi-level-text");
  let locationState = document.querySelector(".location-state");
  let dailyOneHigh = document.querySelector(".daily-one-high");
  let dailyOneLow = document.querySelector(".daily-one-low")
  let dailyTwoHigh = document.querySelector(".daily-two-high");
  let dailyTwoLow = document.querySelector(".daily-two-low");
  let dailyThreeHigh = document.querySelector(".daily-three-high");
  let dailyThreeLow = document.querySelector(".daily-three-low");
  let dailyFourHigh = document.querySelector(".daily-four-high");
  let dailyFourLow = document.querySelector(".daily-four-low");
  let dayOneDate = document.querySelector(".day-one-date");
  let dayTwoDate = document.querySelector(".day-two-date");
  let dayThreeDate = document.querySelector(".day-three-date");
  let dayFourDate = document.querySelector(".day-four-date");
  let dayOneDescription = document.querySelector(".day-one-des");
  let dayTwoDescription = document.querySelector(".day-two-des");
  let dayThreeDescription = document.querySelector(".day-three-des");
  let dayFourDescription = document.querySelector(".day-four-des");
  let dayOneRain = document.querySelector(".day-one-rain");
  let dayTwoRain = document.querySelector(".day-two-rain");
  let dayThreeRain = document.querySelector(".day-three-rain");
  let dayFourRain = document.querySelector(".day-four-rain");
  let aqiLevelDigit = document.querySelector(".aqi-level-digit");
  let uvIndexDigit = document.querySelector(".uv-index-digit");
  let humidityDigit = document.querySelector(".humidity-digit");
  let humidityText = document.querySelector(".humidity-text");
  let sunriseTime = document.querySelector(".sunrise-time");
  let sunsetTime = document.querySelector(".sunset-time");
  let visibilityDigit = document.querySelector(".visibility-digit");
  let cloudsDigit = document.querySelector(".clouds-digit");


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
          const { city_name, clouds, temp, ob_time, uv, weather, pod, wind_spd, wind_cdir, aqi, rh, sunrise, sunset, vis, country_code } = weatherData.data[0];

          locationTimezone.textContent = city_name;
          temperatureDegree.innerHTML = temp + "&#176;";
          temperatureDescription.textContent = weather.description;
          locationState.textContent = "/" + country_code;
          windSpeedText.textContent = Math.round(wind_spd);
          humidityDigit.textContent = Math.round(rh);
          sunriseTime.textContent = dateSplit(sunrise) + "am";
          sunsetTime.textContent = dateSplit(sunset) + "pm";
          visibilityDigit.textContent = vis;
          cloudsDigit.textContent = clouds;

          const sunriseAnimation = lottie.loadAnimation({
            container: document.querySelector(".sunrise-animation"),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: "./assets/sunrise.json"
          });
          const sunsetAnimation = lottie.loadAnimation({
            container: document.querySelector(".sunset-animation"),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: "./assets/sunrise.json"
          });
          sunriseAnimation.setSpeed(0.2);
          sunsetAnimation.setSpeed(-0.2);

          checkHumidity(rh);
          windDirection(wind_cdir);
          aqiCheck(aqi);
          uvCheck(uv, pod);
          celcius = temp;
          setIcons(weather, pod);

          return fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&key=ae3720f4b81244fd99737ca75bb804ea`)
            .then(response => {
              return response.json();
            })
            .then(historicalData => {
              apiLoaded = true;
              console.log(historicalData)
              document.querySelector("body").style.visibility = "visible";

              const dayOneMax = historicalData.data[0].max_temp;
              const dayOneMin = historicalData.data[0].min_temp;
              const dayOneWeather = historicalData.data[0].weather.code;
              const dayOneDes = historicalData.data[0].weather.description;
              const dayOneR = historicalData.data[0].pop;

              const dayTwoMax = historicalData.data[1].max_temp;
              const dayTwoMin = historicalData.data[1].min_temp;
              const dayTwoWeather = historicalData.data[1].weather.code;
              const dayTwoDes = historicalData.data[1].weather.description;
              const dayTwoR = historicalData.data[1].pop;

              const dayThreeMax = historicalData.data[2].max_temp;
              const dayThreeMin = historicalData.data[2].min_temp;
              const dayThreeWeather = historicalData.data[2].weather.code;
              const dayThreeDes = historicalData.data[2].weather.description;
              const dayThreeR = historicalData.data[2].pop;

              const dayFourMax = historicalData.data[3].max_temp;
              const dayFourMin = historicalData.data[3].min_temp;
              const dayFourWeather = historicalData.data[3].weather.code;
              const dayFourDes = historicalData.data[3].weather.description;
              const dayFourR = historicalData.data[3].pop;

              const weatherArray = [dayOneWeather, dayTwoWeather, dayThreeWeather, dayFourWeather];

              umbrellaIcon(dayOneR, dayTwoR, dayThreeR, dayFourR);

              dayOneDate.textContent = dayOne;
              dayTwoDate.textContent = dayTwo;
              dayThreeDate.textContent = dayThree;
              dayFourDate.textContent = dayFour;

              dayOneDescription.textContent = dayOneDes;
              dayTwoDescription.textContent = dayTwoDes;
              dayThreeDescription.textContent = dayThreeDes;
              dayFourDescription.textContent = dayFourDes;

              dailyOneHigh.innerHTML = dayOneMax + "&#176;";
              dailyOneLow.innerHTML = dayOneMin + "&#176;";

              dailyTwoHigh.innerHTML = dayTwoMax + "&#176;";
              dailyTwoLow.innerHTML = dayTwoMin + "&#176;";

              dailyThreeHigh.innerHTML = dayThreeMax + "&#176;";
              dailyThreeLow.innerHTML = dayThreeMin + "&#176;";

              dailyFourHigh.innerHTML = dayFourMax + "&#176;";
              dailyFourLow.innerHTML = dayFourMin + "&#176;";

              dayOneRain.textContent = dayOneR + "%";
              dayTwoRain.textContent = dayTwoR + "%";
              dayThreeRain.textContent = dayThreeR + "%";
              dayFourRain.textContent = dayFourR + "%";

              for (let iteration = 0; iteration <= 3; iteration++) {
                setDailyIcons(weatherArray[iteration], iteration);
              }
            })
        })
    })
  }
  else {
    document.getElementById("location-timezone").innerText = "Allow geolocation access."
  }

  function setDailyIcons(weatherArray, iteration) {
    const currentIconId = weatherArray;
    if (currentIconId === 800) {
      if (iteration === 0) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-one"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/sun-weather.json"
        });
      }
      else if (iteration === 1) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-two"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/sun-weather.json"
        });
      }
      else if (iteration === 2) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-three"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/sun-weather.json"
        });
      }
      else if (iteration === 3) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-four"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/sun-weather.json"
        });
      }
    }

    else if (currentIconId === 801 || currentIconId === 802 || currentIconId === 803 || currentIconId === 804) {
      if (iteration === 0) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-one"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/cloudy-weather.json"
        });
      }
      else if (iteration === 1) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-two"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/cloudy-weather.json"
        });
      }
      else if (iteration === 2) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-three"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/cloudy-weather.json"
        });
      }
      else if (iteration === 3) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-four"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/cloudy-weather.json"
        });
      }
    }
    else if (currentIconId === 500 || currentIconId === 501 || currentIconId === 511 || currentIconId === 520 || currentIconId === 521 || currentIconId === 300 || currentIconId === 301 || currentIconId === 302) {
      if (iteration === 0) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-one"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/rainy-weather.json"
        });
      }
      else if (iteration === 1) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-two"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/rainy-weather.json"
        });
      }
      else if (iteration === 2) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-three"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/rainy-weather.json"
        });
      }
      else if (iteration === 3) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-four"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/rainy-weather.json"
        });
      }
    }
    else if (currentIconId === 200 || currentIconId === 201 || currentIconId === 202 || currentIconId === 230 || currentIconId === 231 || currentIconId === 232 || currentIconId === 233) {
      if (iteration === 0) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-one"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/stormy-weather.json"
        });
      }
      else if (iteration === 1) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-two"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/stormy-weather.json"
        });
      }
      else if (iteration === 2) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-three"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/stormy-weather.json"
        });
      }
      else if (iteration === 3) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-four"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/stormy-weather.json"
        });
      }
    }
    else if (currentIconId === 502 || currentIconId === 522) {
      if (iteration === 0) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-one"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/torrential-rain-weather.json"
        });
      }
      else if (iteration === 1) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-two"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/torrential-rain-weather.json"
        });
      }
      else if (iteration === 2) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-three"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/torrential-rain-weather.json"
        });
      }
      else if (iteration === 3) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-four"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/torrential-rain-weather.json"
        });
      }
    }
    else if (currentIconId === 600 || currentIconId === 601 || currentIconId === 610 || currentIconId === 611 || currentIconId === 621) {
      if (iteration === 0) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-one"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/light-snowy-weather.json"
        });
      }
      else if (iteration === 1) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-two"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/light-snowy-weather.json"
        });
      }
      else if (iteration === 2) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-three"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/light-snowy-weather.json"
        });
      }
      else if (iteration === 3) {
        lottie.loadAnimation({
          container: document.querySelector(".daily-icon-four"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/weather/light-snowy-weather.json"
        });
      }
    }
  }

  function setIcons(weather, pod) {
    const currentIconId = parseInt(weather.code);
    const currentPod = pod.toString();
    if (currentIconId === 800 && currentPod === 'd') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/sun-weather.json"
      });
      document.body.style.background = "linear-gradient(135deg, #0575E6, #021B79)";
    }
    else if (currentIconId === 800 && currentPod === 'n') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/night-weather.json"
      });
      document.body.style.background = "linear-gradient(135deg, #434343, #000000)";
    }
    else if ((currentIconId === 801 || currentIconId === 802 || currentIconId === 803 || currentIconId === 804) && currentPod === 'd') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/cloudy-weather.json"
      });
      document.body.style.background = "linear-gradient(135deg, #0575E6, #021B79)";
      cloudBackground.style.display = "inline-block";
    }
    else if ((currentIconId === 801 || currentIconId === 802 || currentIconId === 803 || currentIconId === 804) && currentPod === 'n') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/night-weather.json"
      });
      document.body.style.background = "linear-gradient(135deg, #434343, #000000)";
      cloudBackground.style.display = "inline-block";
    }
    else if (currentIconId === 500 || currentIconId === 501 || currentIconId === 511 || currentIconId === 520 || currentIconId === 521 || currentIconId === 300 || currentIconId === 301 || currentIconId === 302) {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/rainy-weather.json"
      });
      document.body.style.background = "linear-gradient(135deg, #07519c, #0e1418)";
    }
    else if (currentIconId === 200 || currentIconId === 201 || currentIconId === 202 || currentIconId === 230 || currentIconId === 231 || currentIconId === 232 || currentIconId === 233) {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/stormy-weather.json"
      });
      document.body.style.background = "linear-gradient(135deg, #0d4680, #06080a)";
    }
    else if (currentIconId === 502 || currentIconId === 522) {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/torrential-rain-weather.json"
      });
      document.body.style.background = "linear-gradient(135deg, #0d4680, #06080a)";
    }
    else if (currentIconId === 600 || currentIconId === 601 || currentIconId === 610 || currentIconId === 611 || currentIconId === 621) {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/light-snowy-weather.json"
      });
      document.body.style.background = "linear-gradient(135deg, #e4e5e6, #00416a)";
    }
    else {
      console.log(currentIconId, currentPod)
    }
  }

  function aqiCheck(aqi) {
    if (aqi <= 50) {
      aqiLevelDigit.textContent = aqi;
      // aqiLevelDigit.style.color = "#83FE84"
      aqiLevel.textContent = `Good`;
    }
    else if (aqi <= 100) {
      aqiLevelDigit.textContent = aqi;
      // aqiLevelDigit.style.color = "#83FE84"
      aqiLevel.textContent = `Satisfactory`;
    }
    else if (aqi <= 200) {
      aqiLevelDigit.textContent = aqi;
      // aqiLevelDigit.style.color = "#FFFA5D"
      aqiLevel.textContent = `Moderate`;
    }
    else if (aqi <= 300) {
      aqiLevelDigit.textContent = aqi;
      // aqiLevelDigit.style.color = "#FFB870"
      aqiLevel.textContent = `Poor`;
    }
    else if (aqi <= 400) {
      aqiLevelDigit.textContent = aqi;
      // aqiLevelDigit.style.color = "#FFB870"
      aqiLevel.textContent = `Bad`;
    }
    else if (aqi <= 500) {
      aqiLevel.textContent = `Severe (${aqi})`;
    }
  }

  function uvCheck(uv, pod) {
    if (pod === "d") {
      uv = Math.round(uv);
      if (uv <= 2) {
        uvIndex.textContent = `Low`;
        uvIndexDigit.textContent = uv;
      }
      else if (uv <= 5) {
        uvIndex.textContent = `Moderate`;
        uvIndexDigit.textContent = uv;
      }
      else if (uv <= 7) {
        uvIndex.textContent = `High`;
        uvIndexDigit.textContent = uv;
      }
      else if (uv <= 10) {
        uvIndex.textContent = `Inflated`;
        uvIndexDigit.textContent = uv;
      }

      else if (uv === 11) {
        uvIndex.textContent = `Extreme`;
        uvIndexDigit.textContent = uv;
      }
    }
    else {
      uvIndex.textContent = `Night`;
      uvIndexDigit.textContent = '-';
    }
  }

  function umbrellaIcon(dayOneR, dayTwoR, dayThreeR, dayFourR) {
    if (dayOneR >= 50) document.querySelector(".rain-one-icon").style.visibility = "visible";
    else document.querySelector(".rain-one-icon").style.visibility = "hidden";

    if (dayTwoR >= 50) document.querySelector(".rain-two-icon").style.visibility = "visible";
    else document.querySelector(".rain-two-icon").style.visibility = "hidden";

    if (dayThreeR >= 50) document.querySelector(".rain-three-icon").style.visibility = "visible";
    else document.querySelector(".rain-three-icon").style.visibility = "hidden";

    if (dayFourR >= 50) document.querySelector(".rain-four-icon").style.visibility = "visible";
    else document.querySelector(".rain-four-icon").style.visibility = "hidden";
  }

  function windDirection(wind_cdir) {
    if (wind_cdir) {
      if (wind_cdir === "E") {
        lottie.loadAnimation({
          container: document.querySelector(".wind-speed-animation"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/wind.json"
        });
      }
      else if (wind_cdir === "S") {
        lottie.loadAnimation({
          container: document.querySelector(".wind-speed-animation"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/wind.json"
        });
        document.querySelector(".wind-speed-animation").style.transform = "rotate(90deg)"
      }
      else if (wind_cdir === "W") {
        lottie.loadAnimation({
          container: document.querySelector(".wind-speed-animation"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/wind.json"
        });
        document.querySelector(".wind-speed-animation").style.transform = "rotate(180deg)"
      }
      else if (wind_cdir === "N") {
        lottie.loadAnimation({
          container: document.querySelector(".wind-speed-animation"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/wind.json"
        });
        document.querySelector(".wind-speed-animation").style.transform = "rotate(-90deg)"
      }
      else if (wind_cdir === "S") {
        lottie.loadAnimation({
          container: document.querySelector(".wind-speed-animation"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/wind.json"
        });
        document.querySelector(".wind-speed-animation").style.transform = "rotate(90deg)"
      }
      else if (wind_cdir === "ESE" || wind_cdir === "SE" || wind_cdir === "SSE") {
        lottie.loadAnimation({
          container: document.querySelector(".wind-speed-animation"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/wind.json"
        });
        document.querySelector(".wind-speed-animation").style.transform = "rotate(45deg)"
      }
      else if (wind_cdir === "NW" || wind_cdir === "WNW" || wind_cdir === "NNW") {
        lottie.loadAnimation({
          container: document.querySelector(".wind-speed-animation"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/wind.json"
        });
        document.querySelector(".wind-speed-animation").style.transform = "rotate(225deg)"
      }
      else if (wind_cdir === "ENE" || wind_cdir === "NE" || wind_cdir === "NNE") {
        lottie.loadAnimation({
          container: document.querySelector(".wind-speed-animation"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/wind.json"
        });
        document.querySelector(".wind-speed-animation").style.transform = "rotate(-45deg)"
      }
      else if (wind_cdir === "WSW" || wind_cdir === "SW" || wind_cdir === "SSW") {
        lottie.loadAnimation({
          container: document.querySelector(".wind-speed-animation"),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: "./assets/wind.json"
        });
        document.querySelector(".wind-speed-animation").style.transform = "rotate(135deg)"
      }
      else {
        console.log("Wrong direction");
      }
    }
  }

  function checkHumidity(rh) {
    if (rh <= 15) {
      humidityText.textContent = "Shrivel";
    }
    else if (rh <= 30) {
      humidityText.textContent = "Dry";
    }
    else if (rh <= 50) {
      humidityText.textContent = "Comfortable";
    }
    else if (rh <= 80) {
      humidityText.textContent = "Humid";
    }
    else if (rh <= 100) {
      humidityText.textContent = "Muggy";
    }
  }
});

function changeMeasurement() {
  if (currentMeasurement === "celcius") {
    fahrenheit = celcius * 9 / 5 + 32;
    temperatureDegree.innerHTML = Math.round(fahrenheit).toFixed(1) + "&#176;";
    degreeName.textContent = "F"
    currentMeasurement = "fahrenheit"
  }

  else if (currentMeasurement === "fahrenheit") {
    temperatureDegree.innerHTML = celcius + "&#176;";
    degreeName.textContent = "C"
    currentMeasurement = "celcius"
  }
}

function dateSplit(timeToSplit) {
  let splitted = timeToSplit.split(":");
  let apiHour = parseInt(splitted[0]);
  let apiMinute = parseInt(splitted[1]);
  let testZone = (-2).toString()
  let splittedTimeZone = null;
  if (testZone.includes(".")) {
    splittedTimeZone = testZone.split(".");
  }
  else {
    splittedTimeZone = (testZone + ".0").split(".");
  }
  console.log(splittedTimeZone)
  let hour = parseInt(splittedTimeZone[0]);
  let min = parseInt(splittedTimeZone[1]);
  min = (min * 10) * 60 / 100
  if (testZone[0] === "-") {
    min = -min;
  }
  console.log(apiHour)
  apiHour = apiHour + hour;
  apiMinute = apiMinute + min;
  console.log(apiHour, apiMinute)
  if (apiMinute >= 60) {
    apiHour++;
    apiMinute = apiMinute - 60;
  }
  if (apiMinute < 0) {
    apiHour--;
    apiMinute = 60 - apiMinute;
  }
  if (apiMinute < 10) {
    apiMinute = "0" + apiMinute;
  }

  if (apiHour > 12) {
    apiHour = apiHour - 12;
  }
  if (apiHour < 0) {
    return apiHour * (-1) + ":" + apiMinute;
  }
  else {
    return apiHour + ":" + apiMinute;
  }
}