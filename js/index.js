let currentMeasurement = "celcius";
let celcius = null;
let fahrenheit = null;
let temperatureDegree = document.querySelector(".temperature-degree");
let degreeName = document.querySelector(".degree-name");
let uvIndex = document.querySelector(".uv-index-text");

window.addEventListener("load", () => {
  let long, lat;
  let locationTimezone = document.querySelector(".location-timezone");
  let windSpeedText = document.querySelector(".wind-speed-text");
  let temperatureDescription = document.querySelector(".temperature-description");
  let aqiLevel = document.querySelector(".aqi-level-text");
  let locationState = document.querySelector(".location-state");

 
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
          const { city_name, clouds, temp, timezone, uv, weather, pod, wind_spd, wind_cdir_full, aqi} = weatherData.data[0];
          console.log(city_name, clouds, temp, timezone, uv, weather);
          locationTimezone.textContent = city_name;
          temperatureDegree.innerHTML = temp + "&#176;";
          temperatureDescription.textContent = weather.description;
          locationState.textContent = timezone;
          windSpeedText.textContent = wind_spd.toFixed(1) + " km/h";
          aqiCheck(aqi);
          uvCheck(uv.toFixed(1));
          celcius = temp;
          setIcons(weather, pod);

          return fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&key=ae3720f4b81244fd99737ca75bb804ea`)
            .then(response => {
              return response.json();
            })
            .then(historicalData => {
              console.log(historicalData)

              const dayOneMax = historicalData.data[1].max_temp;
              const dayOneMin = historicalData.data[1].min_temp;
              const dayOneWeather = historicalData.data[1].weather.code;
              
              const dayTwoMax = historicalData.data[2].max_temp;
              const dayTwoMin = historicalData.data[2].min_temp;
              const dayTwoWeather = historicalData.data[2].weather.code;

              const dayThreeMax = historicalData.data[3].max_temp;
              const dayThreeMin = historicalData.data[3].min_temp;
              const dayThreeWeather = historicalData.data[3].weather.code;

              const dayFourMax = historicalData.data[4].max_temp;
              const dayFourMin = historicalData.data[4].min_temp;
              const dayFourWeather = historicalData.data[4].weather.code;
              console.log(dayOneMax, dayOneMin, dayOneWeather);

              const weatherArray = [dayOneWeather, dayTwoWeather, dayTwoWeather, dayFourWeather];

              for(let iteration = 0; iteration <=3; iteration++) {
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
    console.log(weatherArray, iteration)
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
    
    else if(currentIconId === 801 || currentIconId === 802 || currentIconId === 803 || currentIconId === 804) {
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
      console.log("check")
    }
    else if(currentIconId === 500 || currentIconId === 501 || currentIconId === 511 || currentIconId === 520 || currentIconId === 521 || currentIconId === 300 || currentIconId === 301 || currentIconId === 302) {
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
    else if(currentIconId === 200 || currentIconId === 201 || currentIconId === 202 || currentIconId === 230 || currentIconId === 231 || currentIconId === 232 || currentIconId === 233) {
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
    else if(currentIconId === 502 || currentIconId === 522) {
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
    else if(currentIconId === 600 || currentIconId === 601 || currentIconId === 610 || currentIconId === 611 || currentIconId === 621) {
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
    const currentIconId = weather.code;
    const currentPod = pod;
    if (currentIconId === 800 && currentPod === 'd') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/sun-weather.json"
      });
    }
    else if(currentIconId === 800 && currentPod === 'n') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/night-weather.json"
      });
    }
    else if(currentIconId === 801 || currentIconId === 802 || currentIconId === 803 || currentIconId === 804  && currentPod === 'd') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/cloudy-weather.json"
      });
    }
    else if(currentIconId === 801 || currentIconId === 802 || currentIconId === 803 || currentIconId === 804  && currentPod === 'n') {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/night-weather.json"
      });
    }
    else if(currentIconId === 500 || currentIconId === 501 || currentIconId === 511 || currentIconId === 520 || currentIconId === 521 || currentIconId === 300 || currentIconId === 301 || currentIconId === 302) {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/rainy-weather.json"
      });
    }
    else if(currentIconId === 200 || currentIconId === 201 || currentIconId === 202 || currentIconId === 230 || currentIconId === 231 || currentIconId === 232 || currentIconId === 233) {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/stormy-weather.json"
      });
    }
    else if(currentIconId === 502 || currentIconId === 522) {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/torrential-rain-weather.json"
      });
    }
    else if(currentIconId === 600 || currentIconId === 601 || currentIconId === 610 || currentIconId === 611 || currentIconId === 621) {
      lottie.loadAnimation({
        container: document.getElementById('test'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: "./assets/weather/light-snowy-weather.json"
      });
    }
    else {
      console.log(currentIconId, currentPod)
    }
  }
  
  function aqiCheck(aqi) {
    if(aqi <= 50) {
      aqiLevel.textContent = `AQ Index: Good (${aqi})`; 
    }
    else if(aqi <= 100) {
      aqiLevel.textContent = `AQ Index: Satisfactory (${aqi})`; 
    }
    else if(aqi <= 200) {
      aqiLevel.textContent = `AQ Index: Moderate (${aqi})`; 
    }
    else if(aqi <= 300) {
      aqiLevel.textContent = `AQ Index: Poor (${aqi})`; 
    }
    else if(aqi <= 400) {
      aqiLevel.textContent = `AQ Index: Very Poor (${aqi})`; 
    }
    else if(aqi <= 500) {
      aqiLevel.textContent = `AQ Index: Severe (${aqi})`; 
    }
  }

  function uvCheck(uv) {
    if(uv <= 2) uvIndex.textContent = `UV Index: Low (${uv})`;
    else if(uv <= 5) uvIndex.textContent = `UV Index: Moderate (${uv})`;
    else if(uv <= 7) uvIndex.textContent = `UV Index: High (${uv})`;
    else if(uv <= 10) uvIndex.textContent = `UV Index: Very High (${uv})`;
    else if(uv === 11) uvIndex.textContent = `UV Index: Extreme (${uv})`;
  }
});

function changeMeasurement() {
  if (currentMeasurement === "celcius") {
    fahrenheit = celcius * 9/5 + 32;
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
