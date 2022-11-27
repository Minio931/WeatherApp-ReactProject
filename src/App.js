import { useState, Fragment } from "react";
import "./App.css";
import WeatherForm from "./components/WeatherForm";

import WeatherForecastItem from "./components/WeatherCard/WeatherForecastItem";
import useHttp from "./hooks/use-http";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [isSend, setIsSent] = useState(false);

  const { sendRequest: fetchWeather, isLoading, hasError } = useHttp();
  let isCurrentWeather = false;

  const transformWeatherData = (data) => {
    const loadedWeatherData = [];

    for (const item of data.list) {
      loadedWeatherData.push({
        id: Math.random(),
        name: data.city.name,
        country: data.city.country,
        time: item.dt_txt,
        temp: item.main.temp,
        pressure: item.main.pressure,
        tempFeelsLike: item.main.feels_like,
        description: item.weather.map((item) => item.description),
        clouds: item.clouds.all,
        wind: {
          deg: item.wind.deg,
          speed: item.wind.speed,
        },
        icon: item.weather.map((item) => item.icon),
      });
    }

    setWeatherData(loadedWeatherData);
    setIsSent(true);
  };

  const getFetchValues = (cityNameValue) => {
    fetchWeather(
      {
        url: "https://api.openweathermap.org/data/2.5/",
        cityName: cityNameValue,
        forecastType: "forecast",
      },
      transformWeatherData
    );
  };

  return (
    <>
      <WeatherForm onSubmit={getFetchValues} />

      <WeatherForecastItem
        data={weatherData}
        isCurrent={isCurrentWeather}
        isLoading={isLoading}
        error={hasError}
        isSent={isSend}
      />
    </>
  );
}

export default App;
