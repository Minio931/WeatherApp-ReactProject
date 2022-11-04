import { useState, Fragment } from "react";
import "./App.css";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard/WeatherCard";

function App() {
  const [weatherData, setIsWeatherData] = useState();
  const [dataRecived, setDataRecived] = useState(false);
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
      const weatherIcon = responseWeatherData.weather.map((item) => item.icon);
      console.log(weatherIcon);
      setIsWeatherData({
        temp: responseWeatherData.main.temp,
        pressure: responseWeatherData.main.pressure,
        tempFeelsLike: responseWeatherData.main.feels_like,
        description: description,
        clouds: responseWeatherData.clouds.all,
        wind: {
          deg: responseWeatherData.wind.deg,
          speed: responseWeatherData.wind.speed,
        },
        icon: weatherIcon,
      });
      setDataRecived(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <WeatherForm onSubmit={fetchWeather} />
      {dataRecived && <WeatherCard data={weatherData} />}
    </>
  );
}

export default App;
