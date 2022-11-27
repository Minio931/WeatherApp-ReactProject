import Card from "../UI/Card";
import classes from "./ForecastItem.module.css";
import { useState } from "react";
import WindItem from "./WindItem";

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
  const [dataset, setDataset] = useState("temperature");
  const buttonHandler = (event) => {
    setDataset(event.target.value);
  };
  console.log(props.weatherInfo[0][0].wind);
  let content;
  let color = "";
  let datasetToDisplay = [];
  let text = "Temperature";
  if (dataset === "temperature") {
    datasetToDisplay = props.weatherInfo[0].map((item) => item.temp);
    color = "rgba(255, 82, 40, 1) ";
    text = "Temperature";
  } else if (dataset === "clouds") {
    datasetToDisplay = props.weatherInfo[0].map((item) => item.clouds);
    color = "rgba(89, 145, 210, 1)";
    text = "Clouds (%)";
  } else if (dataset === "wind") {
    text = "Wind";
    content = (
      <div className={classes.wind}>
        {props.weatherInfo[0].map((item) => (
          <WindItem
            data={item.wind}
            time={item.time.substring(
              item.time.indexOf(" "),
              item.time.length - 3
            )}
          />
        ))}
      </div>
    );
  }
  const options = {
    responsive: true,
    aspectRatio: 2 | 1,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: text,
        color: "rgba(255, 255, 255, 1)",
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
        data: datasetToDisplay,
        color: "white",
        backgroundColor: color,
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

  if (dataset !== "wind") {
    content = <Bar className={classes.graph} options={options} data={data} />;
  }

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
          <button onClick={buttonHandler} value="temperature">
            Temperature
          </button>
          <button onClick={buttonHandler} value="clouds">
            Clouds
          </button>
          <button onClick={buttonHandler} value="wind">
            Wind
          </button>
        </div>
        {/* <Bar className={classes.graph} options={options} data={data} /> */}
        {content}
      </div>
    </Card>
  );
};

export default ForecastItem;
