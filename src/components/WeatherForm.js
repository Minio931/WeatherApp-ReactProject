import { useState } from "react";

import Card from "./UI/Card";
import WeatherLabel from "./WeatherLabel";
import classes from "./WeatherForm.module.css";

const WeatherForm = (props) => {
  const [enteredCity, setEnteredCity] = useState("");

  const inputChangeHandler = (event) => {
    setEnteredCity(event.target.value);
  };

  const isInputInvalid = enteredCity === "" ? true : false;

  const onSubmissionHandler = (event) => {
    event.preventDefault();
    props.onSubmit(enteredCity);
  };

  return (
    <Card className={classes["card-alignment"]}>
      <WeatherLabel />
      <form onSubmit={onSubmissionHandler}>
        <div className={classes["form-controls"]}>
          <label htmlFor="city">Look at weather in your city</label>
          <input
            className={classes.input}
            id="city"
            onChange={inputChangeHandler}
            value={enteredCity}
          />
          <button disabled={isInputInvalid} className={classes.search}>
            Search
          </button>
        </div>
      </form>
    </Card>
  );
};

export default WeatherForm;
