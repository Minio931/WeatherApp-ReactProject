import Card from "../UI/Card";
import classes from "./ForecastItem.module.css";
import { Bar } from "react-chartjs-2";

const ForecastItem = (props) => {
  let temperature = -Infinity;
  let temperatureFeelsLike = -Infinity;

  props.weatherInfo[0].filter(
    (item) => (temperature = item.temp > temperature ? item.temp : temperature)
  );
  props.weatherInfo[0].filter(
    (item) =>
      (temperatureFeelsLike =
        item.tempFeelsLike > temperatureFeelsLike
          ? item.tempFeelsLike
          : temperatureFeelsLike)
  );

  const cityName = props.weatherInfo[0][0].name;
  const countryCode = props.weatherInfo[0][0].country;
  const date = props.weatherInfo[0][0].time.substring(
    0,
    props.weatherInfo[0][0].time.indexOf(" ")
  );
  console.log(props.weatherInfo);
  console.log(date);

  return (
    <Card className={classes.item}>
      <div className={classes["temp-data"]}>
        <img
          alt="weather icon"
          src="http://openweathermap.org/img/wn/10d@2x.png"
        />
        <div className={classes.temp}>
          <span className={classes["main-temp"]}>
            {Math.round(temperature)}&#176;C
          </span>
          <span className={classes["feels-like"]}>
            feels: {temperatureFeelsLike}
          </span>
        </div>
      </div>
      <div className={classes["city-data"]}>
        <span className={classes["city-name"]}>
          {cityName}, {countryCode}
        </span>
        <span className={classes["date-time"]}>{date}</span>
        <span className={classes.description}>clear sky</span>
      </div>
      <div className={classes.chart}>
        <div className={classes.controls}>
          <button>Temperature</button>
          <button>Clouds</button>
          <button>Wind</button>
        </div>
        <Bar
          className={classes.graph}
          options={props.options}
          data={props.data}
        />
      </div>
    </Card>
  );
};

export default ForecastItem;
