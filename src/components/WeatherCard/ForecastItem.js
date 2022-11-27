import Card from "../UI/Card";
import classes from "./ForecastItem.module.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ForecastItem = (props) => {
  const options = {
    responsive: true,
    aspectRatio: 2 | 1,
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  const labels = props.weatherInfo[0].map((item) =>
    item.time.substring(item.time.indexOf(" "), item.time.length - 3)
  );

  const data = {
    labels,
    datasets: [
      {
        label: {
          display: false,
        },
        data: props.weatherInfo[0].map((item) => item.temp),
        color: "white",
        backgroundColor: "yellow",
      },
    ],
  };

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
  const iconCode =
    props.weatherInfo[0][Math.floor(props.weatherInfo[0].length / 2)].icon[0];
  const icon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const description =
    props.weatherInfo[0][Math.floor(props.weatherInfo[0].length / 2)]
      .description[0];

  return (
    <Card className={classes.item}>
      <div className={classes["temp-data"]}>
        <img alt="weather icon" src={icon} />
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
        <span className={classes.description}>{description}</span>
      </div>
      <div className={classes.chart}>
        <div className={classes.controls}>
          <button>Temperature</button>
          <button>Clouds</button>
          <button>Wind</button>
        </div>
        <Bar className={classes.graph} options={options} data={data} />
      </div>
    </Card>
  );
};

export default ForecastItem;
