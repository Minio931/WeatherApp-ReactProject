import Card from "../UI/Card";

import classes from "./WeatherItem.module.css";

const WeatherItem = (props) => {
  let windDirection;
  const windDegree = props.wind.deg;
  if (windDegree >= 348.75 && windDegree < 360) {
    windDirection = "N";
  } else if (windDegree >= 0 && windDegree < 33.75) {
    windDirection = "N";
  } else if (windDegree >= 33.75 && windDegree < 78.75) {
    windDirection = "NE";
  } else if (windDegree >= 78.75 && windDegree < 123.75) {
    windDirection = "E";
  } else if (windDegree >= 123.75 && windDegree < 168.75) {
    windDirection = "SE";
  } else if (windDegree >= 168.75 && windDegree < 213.75) {
    windDirection = "S";
  } else if (windDegree >= 213.75 && windDegree < 258.75) {
    windDirection = "SW";
  } else if (windDegree >= 258.75 && windDegree < 303.75) {
    windDirection = "W";
  } else if (windDegree >= 303.75 && windDegree < 348.75) {
    windDirection = "NW";
  }

  const weatherIcon = `http://openweathermap.org/img/wn/${props.icon[0]}@2x.png`;
  return (
    <Card id={props.id} className={classes.item}>
      <div className={classes["main-data"]}>
        <div className={classes.image}>
          <img src={weatherIcon} alt="weather icon" />
        </div>
        <div className={classes.temperature}>
          <h1>{props.temp}&#176;C</h1>
          <span>feels: {props.tempFeelsLike}</span>
        </div>
      </div>
      <div className={classes["city-info"]}>
        <span className={classes.city}>
          {props.name}, {props.country}
        </span>
        <span className={classes.time}>{props.time}</span>
      </div>
      <div className={classes["additional-data"]}>
        <span className={classes.wind}>
          Wind: {props.wind.speed} km/h <br />
          Direction: {windDirection}
        </span>

        <span className={classes.clouds}>
          {props.description} <br />
          Clouds: {props.clouds}%
        </span>
      </div>
    </Card>
  );
};

export default WeatherItem;
