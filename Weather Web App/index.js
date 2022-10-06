let weather = {
    apiKey: "Add your API key",
    fetchWeather: function (city) {
        // fetch url using api docs
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    // displaying the weather
    displayWeather: function (data) {
    //getting data from api docs
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
    //   console.log(name, icon, description, temp, humidity, speed);
    //displaying the data
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temperature").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity : " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed : " + speed + " km/h";

      document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
      this.fetchWeather(document.querySelector(".type-here").value);
    },
  };
  //search function
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
    //get the content
  });
  
  //add event listener to input box
  document
    .querySelector(".type-here")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  