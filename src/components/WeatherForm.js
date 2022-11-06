import { useState } from "react";

import Card from "./UI/Card";
import WeatherLabel from "./WeatherLabel";
import classes from "./WeatherForm.module.css";

const WeatherForm = (props) => {
  const [enteredCity, setEnteredCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const inputChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  const selectChangeHandler = (event) => {
    setWeatherForecast(event.target.value);
  };
  const isInputInvalid = enteredCity === "" ? true : false;

  const onSubmissionHandler = (event) => {
    event.preventDefault();
    setIsDataSubmitted(true);
    props.onSubmit(enteredCity, weatherForecast);
  };

  const displayClass = isDataSubmitted ? ".display" : "";

  return (
    <Card className={classes["card-alignment"]}>
      <WeatherLabel className={displayClass} />
      <form onSubmit={onSubmissionHandler}>
        <div className={classes["form-controls"]}>
          <label htmlFor="city">Look at weather in your city</label>
          <input
            className={classes.input}
            id="city"
            onChange={inputChangeHandler}
            value={enteredCity}
          />
          <select value={weatherForecast} onChange={selectChangeHandler}>
            <option value="">---Choose-Forecast-Type---</option>
            <option value="weather">Current Weather</option>
            <option value="forecast">5day Forecast</option>
          </select>
          <button disabled={isInputInvalid} className={classes.search}>
            Search
          </button>
        </div>
      </form>
    </Card>
  );
};

export default WeatherForm;
