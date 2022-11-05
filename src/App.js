import { useState, Fragment } from "react";
import "./App.css";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import useHttp from "./hooks/use-http";

function App() {
  const [weatherData, setWeatherData] = useState([]);

  const { sendRequest: fetchWeather, isLoading, hasError } = useHttp();

  const transformWeatherData = (data) => {
    const loadedWeatherData = [];

    loadedWeatherData.push({
      temp: data.main.temp,
      pressure: data.main.pressure,
      tempFeelsLike: data.main.feels_like,
      description: data.weather.map((item) => item.description),
      clouds: data.clouds.all,
      wind: {
        deg: data.wind.deg,
        speed: data.wind.speed,
      },
      icon: data.weather.map((item) => item.icon),
    });

    setWeatherData(loadedWeatherData);
  };

  const getFetchValues = (cityNameValue) => {
    fetchWeather(
      {
        url: "https://api.openweathermap.org/data/2.5/weather?",
        cityName: cityNameValue,
      },
      transformWeatherData
    );
  };

  return (
    <>
      <WeatherForm onSubmit={getFetchValues} />

      <WeatherCard data={weatherData} isLoading={isLoading} error={hasError} />
    </>
  );
}

export default App;
