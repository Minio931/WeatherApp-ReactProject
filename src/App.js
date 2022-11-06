import { useState, Fragment } from "react";
import "./App.css";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import useHttp from "./hooks/use-http";

function App() {
  const [weatherData, setWeatherData] = useState([]);

  const { sendRequest: fetchWeather, isLoading, hasError } = useHttp();

  const transformWeatherData = (data, isCurrent) => {
    const loadedWeatherData = [];

    if (isCurrent) {
      const today = new Date();

      loadedWeatherData.push({
        id: data.sys.id,
        name: data.name,
        country: data.sys.country,
        time: today.toLocaleDateString("en-GB"),
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
    } else {
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
    }

    setWeatherData(loadedWeatherData);
  };

  const getFetchValues = (cityNameValue, forecastType) => {
    fetchWeather(
      {
        url: "https://api.openweathermap.org/data/2.5/",
        cityName: cityNameValue,
        forecastType: forecastType ? forecastType : "weather",
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
