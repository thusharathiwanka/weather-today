window.addEventListener("load", () => {
  let timeZone = document.querySelector(".timezone");
  let temperature = document.querySelector(".temperature");
  let temperatureDes = document.querySelector(".temperature-description");
  let span = document.querySelector("span");
  let body = document.querySelector("body");
  let longitude;
  let latitude;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=71bf666d1eae3a11350b9c11810f0d99`;

      fetch(apiCall)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let temp = data.main.temp / 10;
          let actualTemp = temp.toFixed(2);
          let name = data.name;
          let country = data.sys.country;
          let description = data.weather[0].main;

          if (actualTemp <= 25) {
            body.style.backgroundImage =
              "linear-gradient(120deg, #2980B9, #6DD5FA)";
          } else if (actualTemp > 25) {
            body.style.backgroundImage =
              "linear-gradient(120deg, #fd746c, #ff9068)";
          } else if (actualTemp >= 35) {
            body.style.backgroundImage =
              "linear-gradient(120deg, #CB356B, #BD3F32)";
          }

          timeZone.textContent = `${name} / ${country}`;
          temperature.textContent = actualTemp;
          temperatureDes.textContent = description;
          span.textContent = "C";
        });
    });
  } else {
    timeZone.textContent =
      "Refresh page and allow location permission to get weather information";
  }
});
