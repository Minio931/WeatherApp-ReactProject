import ForecastItem from "./ForecastItem";
import ChooseDay from "./ChooseDay";
import classes from "./WeatherForecastItem.module.css";

import { useState } from "react";
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

const pullData = (day, index, data) => {
  day.push(
    data.filter(
      (item) =>
        item.time.substring(0, item.time.indexOf(" ")) ===
        data[index].time.substring(0, data[index].time.indexOf(" "))
    )
  );
};

const WeatherForecastItem = (props) => {
  const [pickedDay, setPickedDay] = useState(null);
  const weatherData = props.data;
  const dayOne = [];
  const dayTwo = [];
  const dayThree = [];
  const dayFour = [];
  const dayFive = [];

  let index = 0;

  pullData(dayOne, index, weatherData);
  index += dayOne[0].length;
  pullData(dayTwo, index, weatherData);
  index += dayTwo[0].length;
  pullData(dayThree, index, weatherData);
  index += dayThree[0].length;
  pullData(dayFour, index, weatherData);
  index += dayFour[0].length;
  pullData(dayFive, index, weatherData);

  const days = {
    firstDay: dayOne,
    secondDay: dayTwo,
    thirdDay: dayThree,
    fourthDay: dayFour,
    fifthDay: dayFive,
  };

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

  let content;

  if (props.isLoading) {
    content = <p>Loading...</p>;
  }

  if (props.error) {
    content = <p>{props.error}</p>;
  }
  const pickDay = (day) => {
    setPickedDay(day);
  };
  if (props.isSent) {
    const displayDay = pickedDay ? pickedDay : dayOne;

    const labels = pickedDay
      ? pickedDay[0].map((item) =>
          item.time.substring(item.time.indexOf(" "), item.time.length - 3)
        )
      : dayOne[0].map((item) =>
          item.time.substring(item.time.indexOf(" "), item.time.length - 3)
        );

    const data = {
      labels,
      datasets: [
        {
          label: {
            display: false,
          },
          data: displayDay[0].map((item) => item.temp),
          color: "white",
          backgroundColor: "yellow",
        },
      ],
    };
    content = (
      <ForecastItem options={options} data={data} weatherInfo={displayDay} />
    );
  }

  return (
    <div className={classes.module}>
      {props.isSent && content}
      {props.isSent && <ChooseDay days={days} onClick={pickDay} />}
    </div>
  );
};

export default WeatherForecastItem;
