import { useState } from "react";
import "./App.css";
import WeatherForm from "./components/WeatherForm";

function App() {
  const [WeatherData, setIsWeatherData] = useState();
  const appid = "92ec983844507f607bf6431e3ffd98de";

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}}&limit=1&&appid=${appid}`
      );
      const responseData = await response.json();

      let geoLocation = {};

      for (const key in responseData) {
        geoLocation = {
          lat: responseData[key].lat,
          lon: responseData[key].lon,
        };
      }

      const responseWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&lon=${geoLocation.lon}&units=metric&appid=${appid}`
      );
      const responseWeatherData = await responseWeather.json();

      if (!responseWeather.ok) {
        throw new Error("Invalid input");
      }

      const description = responseWeatherData.weather.map(
        (item) => item.description
      );

      console.log(description);
      setIsWeatherData({
        temp: Math.round(responseWeatherData.main.temp),
        pressure: responseWeatherData.main.pressure,
        tempFeelsLike: responseWeatherData.main.feels_like,
        description: description,
        clouds: responseWeatherData.clouds.all,
        wind: {
          deg: responseWeatherData.wind.deg,
          speed: responseWeatherData.wind.speed,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return <WeatherForm onSubmit={fetchWeather} />;
}

export default App;
